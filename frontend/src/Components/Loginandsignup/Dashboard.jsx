import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMusic,
  faCompactDisc,
  faList,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <nav className="flex justify-between items-center bg-gray-800 p-4 rounded-md shadow-lg">
        <div className="text-2xl font-bold">MelodyVersa</div>
        <ul className="flex space-x-6">
          <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
            <FontAwesomeIcon icon={faMusic} />
            <span>Artists</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
            <FontAwesomeIcon icon={faCompactDisc} />
            <span>Albums</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
            <FontAwesomeIcon icon={faList} />
            <span>Genres</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </li>
        </ul>
      </nav>
      <div className="mt-8 text-3xl font-semibold">
        Welcome to MelodyVersa Dashboard
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 p-6 rounded-md text-center shadow-lg">
          <h3 className="text-xl font-semibold">Total Artists</h3>
          <p className="text-4xl font-bold">1,234</p>
        </div>
        <div className="bg-red-500 p-6 rounded-md text-center shadow-lg">
          <h3 className="text-xl font-semibold">Total Albums</h3>
          <p className="text-4xl font-bold">567</p>
        </div>
        <div className="bg-green-500 p-6 rounded-md text-center shadow-lg">
          <h3 className="text-xl font-semibold">Total Genres</h3>
          <p className="text-4xl font-bold">89</p>
        </div>
      </div>
      <div className="mt-8 bg-gray-800 p-6 rounded-md shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Latest Additions</h3>
        <ul className="space-y-2">
          <li className="bg-gray-700 p-4 rounded-md">AC/DC - Back in Black</li>
          <li className="bg-gray-700 p-4 rounded-md">Adele - 25</li>
          <li className="bg-gray-700 p-4 rounded-md">Gorillaz</li>
        </ul>
      </div>
      <div className="mt-12 bg-gray-800 p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">ConnectVerse</h2>
        <p className="mb-4">
          ConnectVerse is a platform that brings together artists, albums, and
          genres in one place. Explore the latest trends, discover new music,
          and connect with your favorite artists.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded-md shadow-lg">
            <h3 className="text-xl font-semibold">Featured Artist</h3>
            <p className="mt-2">
              Discover the latest hits from top artists around the world.
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md shadow-lg">
            <h3 className="text-xl font-semibold">Top Albums</h3>
            <p className="mt-2">
              Explore the top albums that are trending right now.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
