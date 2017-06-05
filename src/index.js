import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_List';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyDG-TmzFcW033hwYuKcxk_xAQbQFJzo4GI';

// Create a new component. This component should produce
// some HTML
class App extends Component {
  constructor(props){
    super(props);
    //set to an empty array because videos will be a list.
    this.state = {
       videos: [],
       selectedVideo: null
      };

      this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
         videos: videos,
         selectedVideo: videos[0]
       });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
      </div>
    );
  }
}

// Take this component's HTML and put it on the
// page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
