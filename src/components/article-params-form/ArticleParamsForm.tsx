import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Select } from 'src/ui/select/Select';
import {
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Text } from 'src/ui/text/Text';
import { Separator } from 'src/ui/separator/Separator';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onApply: (params: ArticleStateType) => void;
	appliedParams: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApply,
	appliedParams,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const toggleState = () => {
		setIsFormOpen((isFormOpen) => !isFormOpen);
	};

	// Сохранение выбранных в форме параметров
	const [fontFamily, setFontFamily] = useState(appliedParams.fontFamilyOption);
	const [fontSize, setFontSize] = useState(appliedParams.fontSizeOption);
	const [fontColor, setFontColor] = useState(appliedParams.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		appliedParams.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(appliedParams.contentWidth);

	// Функция обработки отправки формы
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const newParams: ArticleStateType = {
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		};
		onApply(newParams);
		setIsFormOpen(false);
	};

	// Функция обработки очистки формы
	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

		onApply({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
		setIsFormOpen(false);
	};

	// Закрытие формы при клике вне неё
	const modalRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!isFormOpen) return;
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !modalRef.current?.contains(target)) {
				setIsFormOpen(false);
			}
		};
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleState} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				ref={modalRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={setFontFamily}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={fontSize}
						title={'Размер шрифта'}
						onChange={setFontSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={setFontColor}
					/>

					<Separator />

					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={setBackgroundColor}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={setContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
