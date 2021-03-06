import React, {
	useEffect,
	useState,
	useMemo,
	useRef,
	useLayoutEffect,
} from 'react';
import Swiper from 'swiper';
import { config } from '../../shared/config';
import { http, limitMaxNumberOfElements } from '../../shared/utility';
import Loader from '../../components/Loader/Loader';
import Article from '../Article/Article';
import ArrowLeft from '../../resources/icons/arrow-left.svg';
import ArrowRight from '../../resources/icons/arrow-right.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setSourcedArticles } from '../../store/actions/sources';

const ListArticles = (props) => {
	//console.log('ListArticles.js props: ', props);
	const { catName, from } = props;
	const dispatch = useDispatch();
	const [articlesByCatName, setArticlesByCatName] = useState(null);
	const { apiKey, apiUrl, topHeadlines } = config;
	const country = useSelector((state) => state.sourcesStore.country);
	let refSwiperContainer = useRef();

	useEffect(() => {
		const fetchData = async () => {
			const url =
				apiUrl +
				topHeadlines +
				`category=${catName}&` +
				`country=${country}&` +
				apiKey;

			const result = await http(url, 'GET');
			console.log('result: ', result);
			const payload = {
				[catName]: {
					articles: result.articles,
					country: country,
					category: catName,
				},
			};
			dispatch(setSourcedArticles(payload));
			setArticlesByCatName(result.articles);
		};
		fetchData();
	}, [apiKey, apiUrl, catName, country, dispatch, topHeadlines]);

	useLayoutEffect(() => {
		if (articlesByCatName && articlesByCatName.length) {
			initSwiperSlider();
		}
	}, [articlesByCatName]);

	const initSwiperSlider = () => {
		refSwiperContainer.current = new Swiper(`.swiper-container`, {
			slidesPerView: 1,
			spaceBetween: 30,
			slidesOffsetBefore: 0,
			slidesOffsetAfter: 0,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				640: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
			},
		});
		// init Swiper for multiple components
		let refSwiperContainerCount = refSwiperContainer.current.length;

		if (!refSwiperContainerCount) {
			refSwiperContainer.current.init();
		} else {
			refSwiperContainer.current[refSwiperContainerCount - 1].init();
		}
	};

	const renderArticle = useMemo(() => {
		if (articlesByCatName && articlesByCatName.length) {
			let articlesArray = [];
			let limitedArticlesByCat = limitMaxNumberOfElements(
				articlesByCatName,
				5
			);

			limitedArticlesByCat.map((article) => {
				if (article.source.id || article.source.name) {
					articlesArray.push(
						<Article
							catName={catName}
							from={from}
							heading={'h3'}
							swiper={true}
							columnControl={false}
							article={article}
							key={article.title}
						/>
					);
				}
			});

			return articlesArray;
		}
	}, [articlesByCatName, catName, from]);

	return (
		<div className="swiper-container">
			{!articlesByCatName && <Loader />}
			<div className="swiper-wrapper">{renderArticle}</div>
			<div className="swiper-button-next">
				<ArrowRight />
			</div>
			<div className="swiper-button-prev">
				<ArrowLeft />
			</div>
		</div>
	);
};

export default ListArticles;
