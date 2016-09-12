import React, {
  PropTypes,
} from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  AppRegistry,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import TextInput from '../components/TextInput';

const {width, height} = require('Dimensions').get('window');

const styles = StyleSheet.create({
  cube: {
    // marginLeft: 25,
    marginTop: 10,
    width: width/10,
    height: width/10,
    backgroundColor: 'powderblue'
  },
  image: {
    height: 30,
    width: 30
  }
});

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
    this.submit = this.submit.bind(this);
  }
  static route = {
    navigationBar: {
      visible: false,
    },
  }
  componentDidMount() {
    // this.state.bounceValue.setValue(1.5);     // Start large
    // Animated.spring(                          // Base: spring, decay, timing
    //   this.state.bounceValue,                 // Animate `bounceValue`
    //   {
    //     toValue: 0.8,                         // Animate to smaller size
    //     friction: 1,                          // Bouncier spring
    //   }
    // ).start();   
  }

  submit(query){
    console.log("inside homescreen submit", query);
    fetch('https://itunes.apple.com/search?media=podcast&term=' + query).then((response) => {
      console.log(response);
      // let results = response.json()
    //   console.log("response", results.toString());
      // console.log("response", Object.keys(results)[2]);
      // console.log(JSON.parse(response._bodyText)["results"])
      this.setState({search: JSON.parse(response._bodyText)["results"]})
    })
  }
  render() {
    console.log("width", width);
    console.log("height", height);
    let searchResults; 
    if (this.state.search) {
      console.log(this.state.search.length)
      searchResults = (
        <View>
        {
          this.state.search.map((result, i) => {
            console.log("here",result.artworkUrl30);
            return (
            <View key={i}>
              <Image
                style={styles.image}
                source={result.artworkUrl30}
              />
              <Text>{result.collectionName}</Text>
            </View>
            )
          })
        }
        </View>
      )
    }
    return(
      <View>
        <View>
          <TextInput 
            submit={this.submit} />
        </View>

        {
        // <Animated.Image                         // Base: Image, Text, View
        //           source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
        //           style={{
        //             flex: 1,
        //             transform: [                        // `transform` is an ordered array
        //               {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
        //             ]
        //           }}
        //         />
              }
        {
          searchResults
        }
      </View>
    )
  }

  _handleHelpPress = () => {
    Linking.openURL('https://docs.getexponent.com/versions/v8.0.0/guides/up-and-running.html#can-t-see-your-changes');
  }
}

AppRegistry.registerComponent('HomeScreen', () => UselessTextInput);

const astyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 80,
  },
  cube: {
    // marginLeft: 25,
    marginTop: 10,
    width: 400,
    height: 50,
    backgroundColor: 'powderblue'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 19,
    color: 'rgba(96,100,109, 1)',
  },
  welcomeImage: {
    width: 200,
    height: 34.5,
    marginTop: 3,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});



// return (
//       <View style={styles.container}>
//         <ScrollView
//           style={styles.container}
//           contentContainerStyle={styles.contentContainer}>

//           <View style={styles.welcomeContainer}>
//             <Text style={styles.welcomeText}>
//               Welcome to
//             </Text>

//             <Image
//               source={require('../assets/images/exponent-wordmark.png')}
//               style={styles.welcomeImage}
//             />
//           </View>

//           <View style={styles.getStartedContainer}>
//             <Text style={styles.getStartedText}>
//               Get started by opening
//             </Text>

//             <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
//               <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
//             </View>

//             <Text style={styles.getStartedText}>
//               Change this text and your app will automatically reload.
//             </Text>
//           </View>

//           <View style={styles.helpContainer}>
//             <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
//               <Text style={styles.helpLinkText}>
//                 Help, it didn’t automatically reload!
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>

//         <View style={styles.tabBarInfoContainer}>
//           <Text style={styles.tabBarInfoText}>
//             This is a tab bar. You can edit it in:
//           </Text>

//           <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
//             <MonoText style={styles.codeHighlightText}>navigation/RootNavigation.js</MonoText>
//           </View>
//         </View>
//       </View>
//     );

