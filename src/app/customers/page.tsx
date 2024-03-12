"use client";

import { Suspense, useEffect, useState } from "react";
import Pagination from "./pagination";
import { Customer, CustomerList } from "./customerListData";
import Search from "@/components/search";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";

async function fetchCustomers() {
  const response = await fetch("https://randomuser.me/api/?page=5&results=25");
  if (!response.ok) {
    throw new Error("Error fetching customers");
  }
  const data = await response.json();
  return data;
}
export default function CustomerList() {
  const [custData, setCustData] = useState<Customer[]>([]);
  const [CustomerListData, setCustomerListData] = useState<CustomerList>();
  const [selectedOption, setSelectedOption] = useState("all");
  const [sortByOption, setSortByOption] = useState("name");
  const [displayData, setDisplayData] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  const pageSize = 5;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };

  useEffect(() => {
    fetchCustomers().then((data) => {
      setCustomerListData(data);
      setCustData(data.results);
      settotalResults(data.info.results);
    });
  }, []);
  useEffect(() => {
    if (sortByOption === "name") {
      const sortedData = [...custData].sort((a, b) =>
        a.name.first.localeCompare(b.name.first)
      );
      setDisplayData(sortedData);
    } else {
      setDisplayData([...custData]);
    }
  }, [sortByOption, custData]);
  useEffect(() => {
    if (selectedOption === "show3") {
      const showData = [...displayData].slice(0, 3);
      setDisplayData(showData);
    } else {
      setDisplayData(custData);
    }
  }, [selectedOption]);
  function handleSelectChange(e: any) {
    console.log("clicked", e.target.value);
    setSelectedOption(e.target.value);
  }
  function handleSortBy(e: any) {
    console.log("clicked", e.target.value);
    setSortByOption(e.target.value);
  }
  return (
    <div>
      <h1>Customers</h1>
      <span>Customers will be listed here</span>
      <div className="py-5">
        <Search placeholder="Search users..." />
      </div>
      <div className="flex justify-between gap-x-6 py-5">
        <label htmlFor="sortBy">Sort by:</label>
        <select id="sortBy" onChange={(e) => handleSortBy(e)}>
          <option value="select">Select</option>
          <option value="name">Name</option>
          <option value="date">Date</option>
          <option value="age">Age</option>
        </select>
        <label htmlFor="totalNoRecords"> Total no of records: </label>
        <select id="totalNoRecords" onChange={(e) => handleSelectChange(e)}>
          <option value="all">All</option>
          <option value="show3">Show 3 rows</option>
        </select>
      </div>

      <>
        <ul role="list" className="divide-y divide-gray-100">
          {displayData.length > 0 || <Skeleton count={5} />}
          {displayData.map((person) => (
            <li
              key={person.id.value}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                {/* <Image
                  src={person.picture.thumbnail}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  alt=" picture"
                  width={48}
                  height={48}
                /> */}
                <img
                  width={48}
                  height={48}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={person.picture.thumbnail}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {person.name.first} {person.name.last}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {person.email}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {person.gender}
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Age: {person.dob.age}
                </p>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-xs leading-5 text-gray-900">
                  City: {person.location.city}
                </p>

                <p className="mt-1 text-sm leading-5 text-gray-900">
                  Country: {person.location.country}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <Pagination
          // items={totalResults}
          // currentPage={currentPage}
          // pageSize={pageSize}
          onPageChange={onPageChange}
          pageData={CustomerListData}
        />
      </>
    </div>
  );
}
