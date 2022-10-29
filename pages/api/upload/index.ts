import {NextApiRequest, NextApiResponse} from 'next';
import formidable, {File} from 'formidable';
import {promises as fs} from 'fs';
import mime from 'mime-types';
import {logger} from '@lib/logger';
import {getSession} from 'next-auth/react';
import {titleToSlug} from '@lib/slug';

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({req});
  if (!session?.user?.id) {
    return res.status(401).json({status: 'denied', message: 'Access denied'});
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      data: null,
      error: 'Method Not Allowed',
    });
  } else {
    var formData: { [key: string]: string } = {};
    const files = await new Promise<ProcessedFiles | undefined>(
      (resolve, reject) => {
        const form = new formidable.IncomingForm();
        const files: ProcessedFiles = [];
        form.on('file', (field, file) => {
          files.push([field, file]);
        });
        form.on('field', (name, value) => {
          logger.debug('Got field value: ', name, value);
          formData[name] = value;
        });
        form.on('end', () => resolve(files));
        form.on('error', (err) => reject(err));
        form.parse(req, () => {
        });
      }
    ).catch((e) => {
      logger.error('index', 'Error parsing form', e);
      return res.status(500).json({
        status: 'fail',
        message: 'Upload error',
      });
    });
    if (files?.length) {
      const newGif = await prisma?.gif.create({
        data: {
          userId: session.user.id as string,
          title: formData.title,
          description: formData.description,
          searchTerms: formData.terms.split('|'),
          slug: await titleToSlug(formData.title),
        },
      });
      if (!newGif?.id) {
        return res.status(401).json({
          status: 'error',
          message: 'Unable to save gif',
        });
      }
      logger.debug('FormData: ', formData);
      for (const file of files) {
        const tempPath = file[1].filepath;
        await fs.copyFile(
          tempPath,
          `./public/uploads/${newGif.id}.${mime.extension(
            file[1].mimetype as string
          )}`
        );
        await fs.unlink(tempPath);
      }
      return res.status(201).json({
        status: 'ok',
        message: 'Gif created successfully',
      });
    }
    return res.status(400).json({
      status: 'error',
      message: 'No files in request',
    });
  }
};
// const saveFile = async (file) => {
//   const data = fs.readFileSync(file.path);
//   fs.writeFileSync(`./public/uploads/${file.name}`, data);
//   await fs.unlinkSync(file.path);
// };
export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
