import React from 'react'

type Props = {}

const general = (props: Props) => {
  return (
    <div className="relative" data-hs-combo-box="">
  <div className="relative">
    <input className="py-3 ps-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" role="combobox" aria-expanded="false" value="" data-hs-combo-box-input="">
    <div className="hidden hs-combo-box-active:flex absolute inset-y-0 end-8 items-center z-20">
      <button type="button" className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600" aria-label="Close" data-hs-combo-box-close="">
        <span className="sr-only">Close</span>
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m15 9-6 6"></path>
          <path d="m9 9 6 6"></path>
        </svg>
      </button>
    </div>
    <div className="absolute top-1/2 end-3 -translate-y-1/2" aria-expanded="false" data-hs-combo-box-toggle="">
      <svg className="shrink-0 size-3.5 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m7 15 5 5 5-5"></path>
        <path d="m7 9 5-5 5 5"></path>
      </svg>
    </div>
  </div>
  <div className="absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300" style="display: none;" data-hs-combo-box-output="">
    <div className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" tabindex="0" data-hs-combo-box-output-item="">
      <div className="flex justify-between items-center w-full">
        <span data-hs-combo-box-search-text="Argentina" data-hs-combo-box-value="">Argentina</span>
        <span className="hidden hs-combo-box-selected:block">
          <svg className="shrink-0 size-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </span>
      </div>
    </div>
    <div className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" tabindex="1" data-hs-combo-box-output-item="">
      <div className="flex justify-between items-center w-full">
        <span data-hs-combo-box-search-text="Brazil" data-hs-combo-box-value="">Brazil</span>
        <span className="hidden hs-combo-box-selected:block">
          <svg className="shrink-0 size-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </span>
      </div>
    </div>
    <div className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" tabindex="2" data-hs-combo-box-output-item="">
      <div className="flex justify-between items-center w-full">
        <span data-hs-combo-box-search-text="China" data-hs-combo-box-value="">China</span>
        <span className="hidden hs-combo-box-selected:block">
          <svg className="shrink-0 size-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </span>
      </div>
    </div>
    <div className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" tabindex="3" data-hs-combo-box-output-item="">
      <div className="flex justify-between items-center w-full">
        <span data-hs-combo-box-search-text="USA" data-hs-combo-box-value="">USA</span>
        <span className="hidden hs-combo-box-selected:block">
          <svg className="shrink-0 size-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </span>
      </div>
    </div>
    <div className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" tabindex="3" data-hs-combo-box-output-item="">
      <div className="flex justify-between items-center w-full">
        <span data-hs-combo-box-search-text="Italy" data-hs-combo-box-value="">Italy</span>
        <span className="hidden hs-combo-box-selected:block">
          <svg className="shrink-0 size-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </span>
      </div>
    </div>
    <div className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100" tabindex="3" data-hs-combo-box-output-item="">
      <div className="flex justify-between items-center w-full">
        <span data-hs-combo-box-search-text="France" data-hs-combo-box-value="">France</span>
        <span className="hidden hs-combo-box-selected:block">
          <svg className="shrink-0 size-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </span>
      </div>
    </div>
  </div>
</div>
  )
}

export default general