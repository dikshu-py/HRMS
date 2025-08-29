import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiClient from '../ApiClient/ApiClient';

const View = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await ApiClient.get(`/detail/${id}`);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-w-screen mt-12 p-4">
      {/* Back button at left */}
      
      <div className="mb-4 mt-2">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Centered card */}
      <div className="max-w-full mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-3 text-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Product Details</h2>

        <div  className="flex ">
          <span className="font-medium">Name:</span>
          <span>{data.name}</span>
        </div>
        <div  className="flex ">
          <span className="font-medium">Category:</span>
          <span>{data.category}</span>
        </div>
        <div  className="flex ">
          <span className="font-medium">Brand:</span>
          <span>{data.brand}</span>
        </div>
        <div  className="flex ">
          <span className="font-medium">Price:</span>
          <span>${data.price}</span>
        </div>
        <div className="flex ">
          <span className="font-medium">Detail:</span>
          <span>{data.detail}</span>
        </div>
      
        {data.image && (
                        <div>
                        <p> Image:</p>
                        <img src={data.image} alt="Uploaded" width="200" />
                        </div>
                    )}
      </div>
    </div>
  );
};

export default View;
