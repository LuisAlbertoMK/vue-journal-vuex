export default() => ({
    isLoading: true,
    entries:[
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Laborum eiusmod quis et exercitation reprehenderit in eiusmod enim ullamco et in.',
            picture: null,
        },
        {
            id: new Date().getTime()+1000,
            date: new Date().toDateString(),
            text: 'Culpa id deserunt magna aliqua eu Lorem commodo ipsum quis incididunt laborum dolore magna.',
            picture: null,
        },
        {
            id: new Date().getTime()+2000,
            date: new Date().toDateString(),
            text: 'Consectetur pariatur ex deserunt Lorem nostrud mollit enim culpa.',
            picture: null,
        },
]
})