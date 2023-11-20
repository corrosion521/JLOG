export interface ISearchData {
    title:string;
    nickname:string;
    id:string;
}

export const searchAPI = (keyword:string) => {
    return searchData.filter((v) => v.title.includes(keyword)||v.nickname.includes(keyword))
}

export const searchData :ISearchData[] = [
    {
     "title": "오사카 테마파크 순회 코스!",
     "nickname": "아무개",
     "id": "1"
    },
    {
        "title": "osaka",
        "nickname": "nick",
     "id": "2"
    },
    {
        "title": "오사카 테마파크 순회 코스!",
        "nickname": "아무개",
     "id": "3"
    },
    {
        "title": "오사카 테마파크 순회 코스!",
        "nickname": "아무개",
     "id": "4"
    },
    {
        "title": "오사카 테마파크 순회 코스!",
        "nickname": "아무개",
     "id": "5"
    },
    {
        "title": "오사카 테마파크 순회 코스!",
        "nickname": "아무개",
     "id": "6"
    },
    {
        "title": "오사카 테마파크 순회 코스!",
        "nickname": "아무개",
     "id": "7"
    },
    {
        "title": "오사카 테마파크 순회 코스!",
        "nickname": "아무개",
     "id": "8"
    },
    {
        "title": "오사카 테마파크 순회 코스!",
        "nickname": "아무개",
     "id": "9"
    },
    {
        "title": "오사카 테마파크 순회 코스!",
        "nickname": "아무개",
     "id": "10"
    },
    {
        "title": "오사카 테마파크 순회 코스!",
        "nickname": "아무개",
     "id": "11"
    },
    {
        "title": "오사카 테마파크 순회 코스!",
        "nickname": "아무개",
     "id": "12"
    },
    {
        "title": "오사카 테마파크 순회 코스!",
        "nickname": "아무개",
        "id": "13"
       },
       {
           "title": "osaka",
           "nickname": "nick",
        "id": "14"
       },
       {
           "title": "오사카 테마파크 순회 코스!",
           "nickname": "아무개",
        "id": "15"
       },
       {
           "title": "오사카 테마파크 순회 코스!",
           "nickname": "아무개",
        "id": "16"
       },
       {
           "title": "오사카 테마파크 순회 코스!",
           "nickname": "아무개",
        "id": "17"
       },
       {
           "title": "오사카 테마파크 순회 코스!",
           "nickname": "아무개",
        "id": "18"
       },
       {
           "title": "오사카 테마파크 순회 코스!",
           "nickname": "아무개",
        "id": "19"
       },
       {
           "title": "오사카 테마파크 순회 코스!",
           "nickname": "아무개",
        "id": "20"
       },
       {
           "title": "오사카 테마파크 순회 코스!",
           "nickname": "아무개",
        "id": "21"
       },
       {
           "title": "오사카 테마파크 순회 코스!",
           "nickname": "아무개",
        "id": "22"
       },
       {
           "title": "오사카 테마파크 순회 코스!",
           "nickname": "아무개",
        "id": "23"
       },
       {
           "title": "오사카 테마파크 순회 코스!",
           "nickname": "아무개",
        "id": "24"
       },
]
