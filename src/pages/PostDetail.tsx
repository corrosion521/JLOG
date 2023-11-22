import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {Avatar} from 'react-native-elements';
import {IPostData} from '../Data/PostData';
interface Props {
  item: IPostData;
}

function PostDetail({route}) {
  const {item} = route.params; // route.params 안에서 item을 받아옵니다.

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.post}>
        <View style={styles.title}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
            {item.title}
          </Text>
          <View>
            <Avatar
              rounded
              source={{
                uri: item.profileImg,
              }}
            />
            <View>
              <Text style={{fontSize: 12}}>{item.nickname}</Text>
            </View>
          </View>
        </View>
        <Image
          source={{uri: item.postImg}}
          // source={require('../Data/usj.jpg')}
          // source={require(item.postImg)}
          style={{height: 200, borderRadius: 10}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  post: {
    // backgroundColor: 'white',
    display: 'flex',
    // marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
export default PostDetail;
