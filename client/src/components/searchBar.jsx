import React from "react";

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <form
          className="mt-5 sm:flex sm:items-center"
          onSubmit={onSubmit} // Submit handled by parent
        >
          <input
            id="q"
            name="q"
            className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-[#175d69] focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#175d69] sm:text-sm"
            placeholder="Keyword"
            type="search"
            autoFocus
            value={value}
            onChange={onChange}
          />
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-[#175d69] px-4 py-2 font-medium text-white shadow-sm hover:bg-[#134e58] focus:outline-none focus:ring-2 focus:ring-[#175d69] focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
