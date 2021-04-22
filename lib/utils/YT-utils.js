const getVideoIdBySearchQuery = async (query) => {
  const fetch = require('node-fetch');
  const req = await fetch(
    `https://www.googleapis.com/youtube/v3/search?
    order=viewCount&q=${query}+ambience&type=video&key=AIzaSyD2EFMYVr4ulyHKfZZXQaPJ34bpmYxeEHc&part=snippet`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const reqJson = await req.json();
  const videoId = reqJson.items[0].id.videoId;
  return videoId;
};

module.exports = {
  getVideoIdBySearchQuery,
};
