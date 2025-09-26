import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Сохранение текущих параметров
	const [appliedParams, setAppliedParams] = useState(defaultArticleState);
	// Изменение текущих параметров при отправке формы
	const handleFormSubmit = (newParams: ArticleStateType) => {
		setAppliedParams(newParams);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedParams.fontFamilyOption.value,
					'--font-size': appliedParams.fontSizeOption.value,
					'--font-color': appliedParams.fontColor.value,
					'--bg-color': appliedParams.backgroundColor.value,
					'--container-width': appliedParams.contentWidth.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleFormSubmit} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
