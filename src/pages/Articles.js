import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
const NewsComponent = () => {
  const truncateText = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  const [articles, setArticles] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  //first key=pub_456386e19cd6aba064acb62157a433b316a73
  //second key :pub_45666b23e4ff157ef610f2d5eefd4f442cd6d
  const fetchNews = async (page = '') => {
    const url = `https://newsdata.io/api/1/news?apikey=pub_45666b23e4ff157ef610f2d5eefd4f442cd6d&q=health${page}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setArticles((prevArticles) => [...prevArticles, ...data?.results]);
      setNextPage(data.nextPage);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const loadMore = () => {
    if (nextPage) {
      fetchNews(`&page=${nextPage}`);
    }
  };

  return (
    <div className='all'>
      <h1>News Articles</h1>
    
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",gap:"3%",flexDirection:"row",border:"0px solid black"}}>

   
        {articles.map((article) => (
          <div key={article.article_id} style={{display:"flex",border:"0px solid blue",width:"30%",height:"590px",marginTop:"40px",overflow:"hidden"}}>
              <MDBCard style={{height:"fit-content",border:"2px solid black",boxShadow:"2px 2px 2px black"}}>
      <MDBCardImage src={article?.image_url} position='top' alt='...' style={{width:"100%",height:"300px"}} />
      <MDBCardBody>
        <MDBCardTitle> {truncateText(article.title,10)}</MDBCardTitle>
        <MDBCardText>
        {truncateText(article.description, 30)}...
        </MDBCardText>
        <a href={article.link}>
        <MDBBtn href='#'>Button</MDBBtn></a>
      </MDBCardBody>
    </MDBCard>
          
          </div>
        ))}
          </div>
      {/* <div style={{backgroundColor:"blue"}}>
      {nextPage && (
        <button onClick={loadMore}>Load More</button>
      )}
      </div>
      */}
    </div>
  );
};

export default NewsComponent;
