'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = '.tag-size-';


function titleClickHandler(event) {
  event.preventDefault();
  console.log('Link was clicked!');
  const clickedElement = this;



  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

}


function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('optArticleSelector + customSelector: ' + optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log(linkHTML);

    /* insert link into titleList */

    // titleList.insertAdjacentHTML('afterbegin', linkHTML);

    /* insert link into html variable */

    html = html + linkHTML;
    // console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);

    // console.log(links);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  console.log('params:', params);
  return params;
}

function calculateTagClass(count, params){

}

function generateTags() {

  /* [NEW] create a new variable allTags with an empty array(object) */
  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */

    const tagList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      console.log(tag);

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log(linkHTML);

      /* add generated code to HTML variable */

      html = html + ' ' + linkHTML;
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }


    /* insert HTML of all the links into the tags wrapper */

    tagList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);

      // console.log(links);
    }

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');


  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a class="calculateTagClass" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
    console.log(allTagsHTML);
  }
  /* [NEW] END LOOP: for each tag in allTags: */
  const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
  console.log('tagLinkHTML:', tagLinkHTML);
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

const tagClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag:' + tag);

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href ^= "#tag-"]');
  console.log(activeTagLinks);


  /* START LOOP: for each active tag link */

  for (let activeTagLink of activeTagLinks) {

    /* remove class active */
    activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('hrefTagLinks: ' + hrefTagLinks);

  /* START LOOP: for each found tag link */
  for (let hrefTagLink of hrefTagLinks) {


    /* add class active */
    hrefTagLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }


  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags .list a');
  console.log(links);

  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find author wrapper */

    const authorList = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */

    let html = '';

    /* get author from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor: ' + articleAuthor);


    /* generate HTML of the link */

    const linkHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + 'by ' + articleAuthor + '</span></a></li>';
    console.log(linkHTML);

    /* add generated code to HTML variable */

    html = html + linkHTML;
    console.log(html);

    /* insert HTML of all the links into the author wrapper */
    authorList.innerHTML = html;

    /* END LOOP: for every article: */
  }
}

generateAuthors();

const authorClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('author:' + author);

  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href ^= "#author-"]');
  console.log(activeAuthorLinks);


  /* START LOOP: for each active tag link */

  for (let activeAuthorLink of activeAuthorLinks) {

    /* remove class active */
    activeAuthorLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('hrefAuthorLinks: ' + hrefAuthorLinks);

  /* START LOOP: for each found tag link */
  for (let hrefAuthorLink of hrefAuthorLinks) {


    /* add class active */
    hrefAuthorLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }


  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-authors="' + author + '"]');
};

function addClickListenersToAuthors() {
  /* find all links to authors */
  const links = document.querySelectorAll('.post-author');
  console.log(links);

  /* START LOOP: for each link */
  for (let link of links) {

    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
