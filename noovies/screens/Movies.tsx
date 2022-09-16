import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";
import useQuery from "react-query";
import axios from "axios";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import RNFetchBlob from "rn-fetch-blob";
const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `0b509fc29bded6c0c259c6203d006b72`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Container = styled.ScrollView``;
const View = styled.View`
  flex: 1;
`;
const BgImg = styled.Image``;
const Title = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: white;
`;
const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  margin-left: 15px;
  width: 40%;
`;
const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.6);
`;
const Votes = styled(Overview)`
  margin-top: 5px;
`;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
interface Iresults {
  results: Iresult[];
}
interface Iresult {
  backdrop_path: string;
  overview: string;
  vote_average: number;
  title: string;
  id: number;
  original_title: string;
  poster_path: string;
}
const Movies = () => {
  const isDark = useColorScheme() === "dark";
  const [Loading, setLoading] = useState(true);
  const [nowplaying, setNowPlaying] = useState<Iresults>();
  const getNowPlaying = () => {
    console.log(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
    );
    RNFetchBlob.config({
      trusty: false,
    })
      .fetch(
        "GET",
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
      )
      .then((res) => {
        setNowPlaying(res.data);
        console.log(res.data);
      });
    setLoading(false);
  };
  useEffect(() => {
    getNowPlaying();
  }, []);
  return Loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        timeout={3.5}
        controlsEnabled={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowplaying &&
          nowplaying.map((movie: Iresult) => (
            <View key={movie.id}>
              <BgImg
                style={StyleSheet.absoluteFill}
                source={{ uri: makeImgPath(movie.backdrop_path) }}
              ></BgImg>
              <BlurView
                tint={isDark ? "dark" : "light"}
                intensity={80}
                style={StyleSheet.absoluteFill}
              >
                <Wrapper>
                  <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                  <Column>
                    <Title>{movie.original_title}ddd</Title>
                    <Overview>{movie.overview.slice(0, 90)}...</Overview>
                    <Votes>★{movie.vote_average}/10</Votes>
                  </Column>
                </Wrapper>
              </BlurView>
            </View>
          ))}
      </Swiper>
    </Container>
  );
};
export default Movies;
