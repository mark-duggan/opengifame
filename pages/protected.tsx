import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Router from 'next/router';
import React from 'react'

const ProtectedPage: NextPage = (): JSX.Element => {
    const { status, data } = useSession();
    React.useEffect(() => {
        if (status === "unauthenticated") Router.replace("/auth/signin");
    }, [status])

    if (status === "authenticated") {
        return (
            <div>ProtectedPage</div>
        )
    }
    return <div>Loading....</div>
}

export default ProtectedPage