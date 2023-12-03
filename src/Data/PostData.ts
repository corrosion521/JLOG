import {useEffect, useState} from 'react';
import {Alert} from 'react-native';

// 게시물 타입 정의
// export interface IPostData {
//   id: number;
//   title: string;
//   nickname: string;
//   imgUrl: string;
//   scraps: number;
//   createdTime: string;
// }

// * To Do : 서버에서 게시물 정보 받아오기 *
// export const postData: IPostData[] = [];
export const [postData, setPostData] = useState();
// function getPostData() {
//   fetch('http://jlog.shop/api/v1/post?pageNumber=0&pageSize=10', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then(response => response.json())
//     .then(result => {
//       console.log('결과: ', result.status);
//       if (result.status === 'OK') {
//         setPostData(result.result);

//         console.log(result.result);
//       } else {
//         // 실패 시 에러 메세지
//         return Alert.alert('알림', result.message);
//       }
//     });
// }

//     .then(result => {
//       console.log(result.result.forNovel.count);
//       // console.log("작품명 검색에 대한 결과", result.result.forNovel)

//       //useState이용하여 작품, 작가 배열 초기화
//       if (result.message === '성공') {
//         if (result.result.forNovel.count > 0) {
//           setNovelFlag(true);
//           setNovels(result.result.forNovel.dto);
//           setNovelCnt(result.result.forNovel.count);
//         } else {
//           setNovelFlag(false);
//           setNovels([]);
//           setNovelCnt(0);
//         }
//         if (result.result.forAuthor.count > 0) {
//           setAuthorFlag(true);
//           setAuthors(result.result.forAuthor.dto);
//           setAuthorCnt(result.result.forAuthor.count);
//           // result.result.forAuthor.dto
//           // .map(
//           //     (author) =>
//           //     {
//           //         if(!authors.includes(author.authorName)) {
//           //             setAuthors([...authors,author.authorName]);
//           //         }
//           //     }
//           // )
//         } else {
//           setAuthorFlag(false);
//           setAuthors([]);
//           setAuthorCnt(0);
//         }
//       } else {
//         // 성공하지 못한 경우 ==> 코드 잘 안먹는듯.. 수정필요
//         setNovelFlag(false);
//         setNovels([]);
//         setNovelCnt(0);
//         setAuthorFlag(false);
//         setAuthors([]);
//         setAuthorCnt(0);
//       }
//     });
// }, [searchTerm]);

// 게시물 dummy data
export interface IPostData {
  title: string;
  nickname: string;
  profileImg: string;
  postImg: string;
  id: string;
}
export const dPostData: IPostData[] = [
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',

    // 'https://miro.medium.com/v2/resize:fit:4800/format:webp/1*Wifqk_xBlZcCo5JS6c3lqA.jpeg',
    id: '1',
  },
  {
    title: 'osaka',
    nickname: 'nick',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    // postImg: '../post',
    postImg: '../Data/usj.jpeg',

    id: '2',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '3',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '4',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '5',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '6',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '7',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '8',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '9',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '10',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '11',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '12',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '13',
  },
  {
    title: 'osaka',
    nickname: 'nick',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '14',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '15',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '16',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '/src/Data/usj.jpeg',
    id: '17',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '18',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '19',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '20',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '21',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '22',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '23',
  },
  {
    title: '오사카 테마파크 순회 코스!',
    nickname: '아무개',
    profileImg:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    postImg: '../Data/usj.jpeg',
    id: '24',
  },
];

// 게시물 검색기능(제목, 작성자로 검색)
export const searchAPI = (keyword: string) => {
  return postData.filter(
    v => v.title.includes(keyword) || v.nickname.includes(keyword),
  );
};
