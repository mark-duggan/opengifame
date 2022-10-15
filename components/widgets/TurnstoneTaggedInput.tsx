import React from 'react';
import Turnstone from 'turnstone';

const TaggedInput = () => {
  const styles = {
    input: 'w-full border py-2 px-4 text-lg outline-none rounded-md',
    listbox:
      'cursor-pointer w-full bg-white text-slate-900 rounded-md border-gray-800',
    clearButton:
      'absolute inset-y-0 text-lg right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-red-500',
    noItems: 'cursor-default text-center',
    match: 'font-semibold',
    groupHeading: 'px-5 py-3 text-pink-500',
  };
  const listbox = {
    displayField: 'name',
    data: async (query: string) => {
      const res = await fetch(`api/tags/search?q=${query}`);
      const data = await res.json();
      console.log('TaggedInput', 'response', data);
      return data;
    },
    searchType: 'contains',
  };
  const Item = ({ item }) => {
    console.log('TaggedInput', 'Item', item);
    return (
      <span
        key="{result}"
        className="px-2 py-1 space-x-2 cursor-pointer hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:outline-none"
      >
        {item.name}
      </span>
    );
  };
  return (
    <Turnstone
      clearButton={true}
      debounceWait={250}
      noItemsMessage="We couldn't find any character that matches your search"
      placeholder="Search for tag or add your own"
      listbox={listbox}
      styles={styles}
    />
  );
};

export default TaggedInput;
