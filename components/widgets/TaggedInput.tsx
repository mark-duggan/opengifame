import { useThrottle } from "@lib/useThrottle";
import { debounce } from "lodash";
import React, { KeyboardEventHandler } from "react";

const TaggedInput = () => {
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<Array<string>>([]);
  const [tags, setTags] = React.useState<Array<string>>([]);
  let searchInput: any;

  const handleChange = ($event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText($event.target.value);
  };
  const throttledSearch = useThrottle(async () => {
    setIsSearching(true);

    console.log("TaggedInput", "Searching for", searchText);
    const response = await fetch(`api/tags/search?q=${searchText}`);
    console.log("TaggedInput", "Response", response);
    if (response.status === 200) {
      console.log("TaggedInput", "Status", status);
      const results = await response.json();
      setSearchResults(results.map((r: { name: string }) => r.name));
      setIsSearching(false);
    }
  }, 500);

  React.useEffect(() => {
    if (searchText.length < 3) {
      return;
    }
    console.log("TaggedInput", "throttledSearch", searchText);
    throttledSearch();
  }, [searchText]);

  const handleKeyPress = ($event: React.KeyboardEvent<HTMLInputElement>) => {
    if ($event.code === "Enter" || $event.code === "NumpadEnter") {
      console.log("TaggedInput", "handleKeyPress", $event.currentTarget.value);
    }
  };
  const __addTag = (tag: string) => {
    setTags([...tags, tag]);
    setSearchResults([]);
    setIsSearching(false);
    setSearchText("");
    // searchField.value = "";
    // searchField.focus();
    // value = tags;
  };
  const doResultClick = ($event: any) => __addTag($event.target.textContent);
  return (
    <>
      <label
        htmlFor="{name}"
        className="block text-sm font-medium text-gray-900 "
      >
        Tags
      </label>
      <div className="flex shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="mr-1 inline-flex items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700"
          >
            {tag}
            <button
              type="button"
              className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
            >
              <span className="sr-only">{tag}</span>
              <svg
                className="w-2 h-2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 8 8"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth={1.5}
                  d="M1 1l6 6m0-6L1 7"
                />
              </svg>
            </button>
          </span>
        ))}
        <input
          value={searchText}
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          placeholder="Start typing and press enter"
          className="w-full focus:outline-none"
        />
      </div>

      {searchResults && searchResults.length && (
        <div className={`z-50 ${!isSearching && "-mt-6"} mb-4 flex space-y-0`}>
          <aside
            aria-labelledby="menu-heading"
            className="absolute z-50 flex flex-col items-start w-64 mt-1 text-sm bg-white border rounded-md shadow-md"
          >
            <ul className="flex flex-col w-full">
              {searchResults.map((result) => (
                <li
                  key={result}
                  onClick={doResultClick}
                  className="px-2 py-1 space-x-2 cursor-pointer hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:outline-none"
                >
                  {result}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </>
  );
};

export default TaggedInput;
