// api calls
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '022e12f468msh1fe2768998873dbp113ba4jsn74c05d00c083',
//     'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
//   },
// };

// fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// createApi: 데이터를 패치하고 변환하는 설정을 포함해서 엔드포인트들에서 어떻게 데이터를 패치하는지 정의
export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi', // 리듀서 이름
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY
      );
      return headers;
    },
  }),
  // getTopCharts: 요청이름
  // query: (genre) (주소에 넘길 값) => `api주소값/(주소에 넘길 값)`
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/world' }),
    getSongsByGenre: builder.query({
      query: (genre) => `/charts/genre-world?genre_code=${genre}`,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `/tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/details?artist_id=${artistId}`,
    }),
    getSongByCountry: builder.query({
      query: (countryCode) => `/charts/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
  }),
});

// use요청이름Query
export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;

// 요청을 명시할 때 builder.query 라고 작성하게 되면, get 요청을 보낼 수 있게됨
// builder.mutation 이라고 작성하면, post 혹은 put 요청 등을 보낼 수 있음
