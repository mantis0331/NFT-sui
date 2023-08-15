import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ListItemCard from "../../../../components/layouts/explore/ListItemCard";
import NFTCard from "../../../../components/layouts/NFTCard";
import NFTSkeleton from "../../../../components/layouts/NFTSkeleton";
import { useSearchParams } from "react-router-dom";

const ListingsList = ({ layout, setModalShow, setCount, setPages }) => {
  const { count, results } = useSelector((state) => state.search.listings);
  const loading = useSelector((state) => state.search.loading);
  const [params] = useSearchParams();
  const pageSize = 50;
  const page = params.get("p") || 1;

  useEffect(() => {
    setCount(count);
    count > pageSize && setPages(Math.ceil(count / pageSize));
  }, [count]);

  return !layout ? (
    <div className="content-item">
      {loading
        ? Array.from({ length: 15 }, (_, index) => {
            return (
              <div key={index} className="col-item">
                <NFTSkeleton />
              </div>
            );
          })
        : results.slice(0, pageSize).map((item) => (
            <div key={item._id} className="col-item">
              <NFTCard item={item} setModalShow={setModalShow} />
            </div>
          ))}
    </div>
  ) : (
    <div className="content-item2">
      {results.slice((page - 1) * pageSize, page * pageSize).map((item) => (
        <ListItemCard key={item._id} item={item} setModalShow={setModalShow} />
      ))}
    </div>
  );
};

export default ListingsList;
