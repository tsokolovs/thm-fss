import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { SearchData, useFetchSearchData } from '@hooks';


export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm.trim(), 300);
  const { data: { hotels, countries, cities } } = useFetchSearchData(debouncedSearchTerm);

  // Author-comment: in real app I would add a skeleton loader and utilize isLoading from useFetchSearchData
  return (
    <section className="row height d-flex justify-content-center align-items-center">
      <div className="col-md-6">
        <div className="dropdown">
          <h1 className="sr-only">Search for hotels, countries and cities</h1>
          <form className="form" onSubmit={e => e.preventDefault()}>
            <i className="fa fa-search"></i>
            <input
              type="text"
              className="form-control form-input"
              placeholder="Search accommodation..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              data-testid="search-input"
            />
            {searchTerm.length > 0 && (
              <span>
                <button type="button" className="btn" onClick={() => setSearchTerm('')}>
                  <i className="fa fa-close"></i>
                </button>
              </span>
            )}
          </form>
          {searchTerm.length > 0 && (
            <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
              <EntityData
                title="Hotels"
                data={hotels}
                noDataMessage="No hotels matched"
                nameKey="hotel_name"
                icon="hotel"
                entityBaseUrl="hotel"
              />
              <EntityData
                title="Countries"
                data={countries}
                noDataMessage="No countries matched"
                nameKey="country"
                icon="globe"
                entityBaseUrl="country"
              />
              <EntityData
                title="Cities"
                data={cities}
                noDataMessage="No cities matched"
                nameKey="name"
                icon="city"
                entityBaseUrl="city"
              />
            </div>
          )}
        </div>
      </div>
    </section>

  );
}

// Author-comment: in real app I would find a place for this in a separate file
function EntityData({ title, data, noDataMessage, nameKey, icon, entityBaseUrl }: EntityDataProps) {
  return (
    <section>
      <h1 className="h2">{title}</h1>
      {data.length === 0 && (
        <p data-testid={`${entityBaseUrl}-no-data`}>{noDataMessage}</p>
      )}
      {data.length > 0 && (
        <ul className="list-group mb-4">
          {data.map((entity) => (
            <li className="list-group-item" key={entity._id} data-testid={`${entityBaseUrl}-id-${entity._id}`}>
              <a href={`/${entityBaseUrl}/${entity._id}`} className="dropdown-item pl-0">
                <i className={`fa fa-${icon} mr-2`}></i>
                {entity[nameKey as keyof typeof entity]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

type EntityDataProps = {
  title: string;
  data: SearchData;
  noDataMessage: string;
  nameKey: string;
  icon: string;
  entityBaseUrl: string;
}