'use strict';

var NUM_OF_ELEMENT = 25;
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var description = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var getRandomNumber = function(min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomItemFromArray = function(array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};

var objects = [];

var generateArrayElements = function(arr, num) {
  for (var i = 0; i < num; i++) {
    arr.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: getRandomItemFromArray(comments),
      description: getRandomItemFromArray(description)
    });
  }
};

var templatePhotoElement = document
  .querySelector('#picture')
  .content.querySelector('.picture__link');

var createElementPost = function(picture) {
  var elementPost = templatePhotoElement.cloneNode(true);

  elementPost.querySelector('.picture__img').src = picture.url;
  elementPost.querySelector('.picture__stat--likes').textContent =
    picture.likes;
  elementPost.querySelector('.picture__stat--comments').textContent =
    picture.comments;

  return elementPost;
};

var renderPicturesOnHomePage = function(objects) {
  var fragment = document.createDocumentFragment();
  var homePage = document.querySelector('.pictures');
  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(createElementPost(objects[i]));
  }
  homePage.appendChild(fragment);
};

var elementBigPicture = document.querySelector('.big-picture');
elementBigPicture.classList.remove('hidden');

var showPreviewElement = function(item) {
  var element = elementBigPicture;
  var commentList = element.querySelectorAll('.social__comments');
  element.querySelector('.big-picture__img').src = item.url;
  element.querySelector('.likes-count').textContent = item.likes;
  element.querySelector('.comments-count').textContent = item.comments;
  for (var i = 0; i < commentList.length; i++) {
    commentList[i].querySelector('.social__picture').src =
      'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    commentList[i].querySelector('.social__text').textContent = item.comments;
  }
  element.querySelector('.social__caption').textContent = item.description;
};

var hideElement = function(elem, SomeClass) {
  return elem.classList.add(SomeClass);
};

hideElement(
  document.querySelector('.social__comment-count'),
  'visually-hidden'
);
hideElement(document.querySelector('.social__loadmore'), 'visually-hidden');

generateArrayElements(objects, NUM_OF_ELEMENT);
renderPicturesOnHomePage(objects);
showPreviewElement(objects[0]);
