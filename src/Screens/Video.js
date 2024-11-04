import { StyleSheet, View, Dimensions, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import YouTubeIframe from 'react-native-youtube-iframe';
import WebView from 'react-native-webview';

const { height } = Dimensions.get('window');

// Updated video URLs with names
const videoUrls = [
    { name: 'Nazam', url: 'https://youtube.com/shorts/EtoclnGdufo?si=DQIYErHpjiVzNPu0' },
    { name: 'All About Science', url: 'https://youtu.be/3bnlvyL3X3s?si=PpiHCwCkMi0gdYrO' },
    { name: 'All War in Islam', url: 'https://youtu.be/o5iv_n8cEbo' },
    { name: 'Wasila S Magba', url: 'https://youtube.com/shorts/C3-8fLkqfl0?si=6TEj4k5KFBF2Xjx-' },
    { name: 'Sirk', url: 'https://youtu.be/5W3ge3MBh6s' },
    { name: 'Video 3', url: 'https://youtu.be/rQBF4dRdeVE' },
    { name: 'Video 4', url: 'https://youtube.com/shorts/cd8ofAW5CoI?si=wEV5StxPj_M4Gxxl' },
    { name: 'Video 5', url: 'https://youtube.com/shorts/YTVeZlDuklE?si=vrKrFyl7m2kC5h7u' },
    { name: 'Sayri 1', url: 'https://www.youtube.com/shorts/FVmTyj9DFb0' },
    { name: 'Sayri 2', url: 'https://youtube.com/shorts/0wbmvuA19Jg?si=l9os8KU9L4kfzMoA' },
    { name: 'Sayri 3', url: 'https://youtu.be/96_ik0XAThs?si=hS48xUDquiv7qzS1' },
    { name: 'Asraful Makhluqat', url: 'https://youtube.com/clip/Ugkx-tIVxN4AjZjyxAZjITM4dO38dschOi5Z' },
    { name: 'Music 1', url: 'https://youtube.com/shorts/MGN9WGyFFSo?si=3k3bbgRxEzp0PZVD' },
    { name: 'Music 2', url: 'https://youtube.com/shorts/iAPxiWDuIek?si=8jNWJRtjgrX8AcEH' },
    { name: 'After Death in Kabar', url: 'https://youtube.com/shorts/Ci_C5s5zlTo?si=snmHi8yBTuB-FvDy' },
    { name: 'Last Day Questions', url: 'https://youtube.com/shorts/Gj57rNcks2w?si=EhFg-EYJzc8Txg4p' },
    { name: 'What Allah Wants to See', url: 'https://youtube.com/shorts/bl7lOGyH59M?si=zE5ahC8kiPhjjfi5' },
    {name:"sakoon", url:"https://www.youtube.com/shorts/kfXC0o0y3Gk"},
    {name:"instagram",url:'https://www.instagram.com/reel/CySbD1WtAmb/?igshid=MTc4MmM1YmI2Ng=='},
    {name:'quran reel',url:'https://www.youtube.com/shorts/4WUIo8bpyUA'},
    {name:'quran 2',url:'https://www.youtube.com/shorts/4c25DeAXve8'},
    {name:'mouth',url:'https://youtube.com/shorts/qFDVP50LeQ8?si=458V6uI-TtGWTUPY'},
    {name:'song',url:'https://youtube.com/shorts/9pOvIICYuiA?si=mivzciG5BkbWoiip'},
    {name:'qayamt',url:'https://www.youtube.com/shorts/E41WC3ZMriA'},
    {name:'allha ek he',url:'https://www.youtube.com/shorts/GIrPgQNfEC0'},
    {name:'song',url:'https://www.youtube.com/shorts/QObDJehXhe8'},
    {name:'deep message',url:'https://youtube.com/shorts/aC7e8Q1bLgg?si=DIXlqOP-Vz4r4l0Y'},
    {name:'reelQuran',url:'https://www.youtube.com/shorts/cNtYkGtuapI'}
];

const VideoScreen = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [videoData,setVideoData] = useState([]);

    useEffect(()=>{

        // fetchVideos();
    },[])

    const getVideoIdFromUrl = (url) => {
        console.log('all urls',url)
        // Handle YouTube clips
        if (url.includes('/clip/')) {
            return url.split('/clip/')[1].split('?')[0]; // Extract the ID from clip URL
        }
    
        // Handle shortened YouTube URLs
        if (url.includes('youtu.be/')) {
            return url.split('youtu.be/')[1].split(/[?&]/)[0]; // Extract the video ID
        } 
        
        // Handle standard YouTube URLs
        if (url.includes('watch?v=')) {
            const urlParams = new URLSearchParams(url.split('?')[1]);
            return urlParams.get('v'); // Get the video ID from "v" parameter
        } 
        
        // Handle YouTube shorts
        if (url.includes('/shorts/')) {
            return url.split('/shorts/')[1].split(/[?&]/)[0]; // Extract the ID from shorts URL
        }
           // Handle YouTube shorts
           if (url.includes('/shorts/')) {
            return url.split('/shorts/')[1].split(/[?&]/)[0]; // Extract the ID from shorts URL
        }
    
        return ''; 
    };
    const isInstagramUrl = (url) => url.includes('instagram.com/reel');
    videoUrls.forEach(video => {
        const videoId = getVideoIdFromUrl(video.url);
        console.log(`Video Name: ${video.name}, Video ID: ${videoId}`);
    });

    const getThumbnailUrl = (videoId) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const handleVideoEnd = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
    };



    const fetchVideos = async () => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${'data'}&type=video&key=${'AIzaSyAyQ0R_fqunvWIZeJUAH_NrbOp6012hS44'}`
            );
            const data = await response.json();
            console.log('api data 1',data)
            const videoData = data.items?.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
            }));
            console.log('api data ',videoData)
            setVideoData(videoData);
        } catch (error) {
            console.error(error);
        }
    };
    const renderVideoPlayer = () => {
        const currentUrl = videoUrls[currentVideoIndex].url;
        if (isInstagramUrl(currentUrl)) {
            console.log('instagram url ',currentUrl)
            return (
                <WebView
                    source={{ uri: currentUrl }}
                    style={{ height: height * 0.4 }}
                    startInLoadingState
                />
            );
        } else {
            return (
                <View style={styles.videoContainer}>
                    <YouTubeIframe
                        height={height * 0.4}
                        videoId={getVideoIdFromUrl(currentUrl)}
                        play={true}
                        volume={100}
                        style={styles.backgroundVideo}
                        onChangeState={(state) => {
                            if (state === 'ended') {
                                handleVideoEnd();
                            }
                        }}
                    />
                </View>
            );
        }
    };

    const renderRemainingVideos = () => (
        <FlatList
            data={videoUrls}
            renderItem={({ item, index }) => (
                index !== currentVideoIndex && (
                    <TouchableOpacity
                        onPress={() => setCurrentVideoIndex(index)}
                        style={[styles.remainingVideo, currentVideoIndex === index && styles.selectedVideo]}
                    >
                        <Image
                            source={{ uri: getThumbnailUrl(getVideoIdFromUrl(item.url)) }}
                            style={styles.thumbnail}
                        />
                        <View style={styles.videoDetails}>
                            <Text style={styles.videoTitle}>{item.name}</Text>
                            <Text style={styles.videoDescription}>Video Description Here</Text>
                        </View>
                    </TouchableOpacity>
                )
            )}
            keyExtractor={(item) => item.url}
            showsVerticalScrollIndicator={false}
            style={styles.remainingVideosList}
        />
    );

    return (
        <View style={styles.container}>
            { isInstagramUrl(videoUrls[currentVideoIndex].url) ?null
        //      <View style={styles.header}>
        //      <Text style={styles.headerTitle}>Instagram</Text>
        //  </View>
         : <View style={styles.header}>
                <Text style={styles.headerTitle}>Video Player</Text>
            </View>
            }
          
            {renderVideoPlayer()}
            <View style={styles.remainingVideosContainer}>
                <Text style={styles.sectionTitle}>Related Videos</Text>
                {renderRemainingVideos()}
            </View>
        </View>
    );
};

export default VideoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
    },
    header: {
        height: 60,
        backgroundColor: '#202020',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerTitle: {
        color: '#FF0000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    videoContainer: {
        width: '100%',
        height: height * 0.4,
        backgroundColor: 'black',
    },
    backgroundVideo: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    remainingVideosContainer: {
        padding: 10,
        flex: 1,
    },
    remainingVideosList: {
        marginTop: 10,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    remainingVideo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 8,
        backgroundColor: '#383838',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    selectedVideo: {
        backgroundColor: '#FF0000',
    },
    thumbnail: {
        width: 120,
        height: 90,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'white',
        marginRight: 10,
    },
    videoDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    videoTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    videoDescription: {
        color: 'white',
        fontSize: 12,
        marginTop: 2,
    },
});
