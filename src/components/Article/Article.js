import React from 'react';
import { useHistory } from 'react-router-dom';

const Article = (props) => {
	const { article } = props;
	const history = useHistory();

	const routeChange = (path) => {
		//console.log('Article.js path: ', path);
		history.push(path);
	};

	return (
		<li className="article columnControl__item">
			<h2 className="article__title">{article.title}</h2>
			<div className="article__imageWrapper">
				<img
					className="article__image"
					src={article.urlToImage}
					alt={article.title}
				/>
			</div>
			<p className="article__description">{article.description}</p>
			<button
				className="article__button"
				onClick={() => routeChange(`/article?id=${article.source.id}`)}
			>
				More {'>'}
			</button>
		</li>
	);
};

export default Article;
