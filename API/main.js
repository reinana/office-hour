const button = document.getElementById('button');
const type = document.getElementById('type');
const image = document.getElementById('image');


button.addEventListener('click', () => {
    fetch('https://dog.ceo/api/breed/hound/images/random')
    .then(response => {
        return response.json();
    })
    .then(dogPhoto => {
        // imgタグに取得したURL画像を入れる
        image.src = dogPhoto['message'];
    });
});