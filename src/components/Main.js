import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

import SpotifyUserDetails from "./SpotifyUserDetails";
import SearchArtist from "./ArtistSearch";
import SetlistInfo from "./SetlistInfo";
import PlaylistButton from "./PlaylistButton";

const Main = () => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [error, setError] = useState(false);
  const [artist, setArtist] = useState("");
  const [setlistInfo, setSetlistInfo] = useState("");
  const [songArr, setSongArr] = useState("");
  const [trackIdArr, setTrackIdArr] = useState("");
  const [setlist, setSetlist] = useState("");
  const [alertPopup, setAlertPopup] = useState(false);

  // SpotifyWebApi instantiation
  let token = window.localStorage.getItem("token");
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  //Spotify username and user image
  useEffect(() => {
    const getUserName = async () => {
      const data = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserImage(data.data.images[0].url);
      setUserName(data.data.display_name);
    };
    getUserName();
    console.log("display name + image retrieved successfully");
  }, []);

  // Artist setlist via setlistfm API
  const searchArtist = (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://setlistener-api.onrender.com/setlist",
      params: { artistName: searchKey },
    };

    axios
      .request(options)
      .then((response) => {
        let artistName;

        for (let i = 0; i < response.data.setlist.length; i++) {
          if (
            searchKey.trim().toLowerCase() ===
            response.data.setlist[i].artist.name.toLowerCase()
          ) {
            artistName = response.data.setlist[i].artist.name;
          }
        }

        setArtist(artistName);

        let setlistSongs, setlistEncore, venueName, cityName, eventDate;

        for (let i = 0; i < response.data.setlist.length; i++) {
          if (
            response.data.setlist[i].sets.set.length !== 0 &&
            response.data.setlist[i].sets.set[0].song.length > 4 &&
            artistName === response.data.setlist[i].artist.name
          ) {
            setlistSongs = response.data.setlist[i].sets.set[0].song;
            venueName = response.data.setlist[i].venue.name;
            cityName = response.data.setlist[i].venue.city.name;
            eventDate = response.data.setlist[i].eventDate;
            if (response.data.setlist[i].sets.set[1]) {
              setlistEncore = response.data.setlist[i].sets.set[1].song;
            }
            break;
          }
        }

        // Error message
        if (!setlistSongs) {
          setError(true);
        } else {
          setError(false);
        }

        // Creation of setlist array
        let songsArr = [];

        setlistSongs.forEach((element) => songsArr.push(element.name));

        if (setlistEncore) {
          setlistEncore.forEach((element) => songsArr.push(element.name));
        }

        setSetlist(songsArr);

        // Setlist info section (to be display on page)
        setSetlistInfo(
          `${artistName} at ${venueName} (${cityName}) on ${eventDate}`
        );

        // Creation of array which will be passed on to SpotifyWebApi.addTracks
        let trackArtistArr = [];

        if (songsArr) {
          songsArr.forEach((element) => {
            trackArtistArr.push([`track:${element} artist:${artistName}`]);
          });
        }

        setSongArr(trackArtistArr);
      })
      .catch((err) => {
        console.error(err);
      });

    setSearchKey("");
    setAlertPopup(false);
  };

  // Once setlist array has been created, this code will run to find trackId
  useEffect(() => {
    let trackId = [];

    if (songArr) {
      songArr.forEach(async (song) => {
        await spotifyApi.searchTracks(song).then(
          function (data) {
            trackId.push(data.body.tracks.items[0].uri);
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
      });

      setTrackIdArr(trackId);
    }
  }, [songArr]);

  // Create playlist button
  const createPlaylist = async (e) => {
    e.preventDefault();
    let playlistId;

    // Playlist creation
    await spotifyApi
      .createPlaylist(`${artist} Setlist`, {
        description: setlistInfo,
        public: false,
      })
      .then(
        function (data) {
          playlistId = data.body.id;
          console.log("Created playlist!");
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );

    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ uris: trackIdArr }),
    }).then(
      function (data) {
        console.log("Tracks added!");
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );

    // Adding tracks to created playlist
    // await spotifyApi.addTracksToPlaylist(playlistId, trackIdArr).then(
    //   function (data) {
    //     console.log("Added tracks to playlist!");
    //   },
    //   function (err) {
    //     console.log("Something went wrong!", err);
    //   }
    // );

    setAlertPopup(true);
  };

  return (
    <Fragment>

      {/* Search Artist Section */}
      <SearchArtist
        searchArtist={searchArtist}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        error={error}
      />

      {/* Spotify User Details Section || Setlist Information */}
      {setlistInfo ? (
        <SetlistInfo setlistInfo={setlistInfo} setlist={setlist} />
      ) : (
        <SpotifyUserDetails userImage={userImage} userName={userName} />
      )}

      {/* Create Playlist Button Section */}
      {setlistInfo && (
        <PlaylistButton
          createPlaylist={createPlaylist}
          alertPopup={alertPopup}
        />
      )}
    </Fragment>
  );
};

export default Main;
