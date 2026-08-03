import React, { useState } from 'react';
import type { Fruit } from '../types/fruit';
import { styles } from './FruitCard.styles';
import { FALLBACK_IMAGE } from '../assets/fallbackImage';

interface FruitCardProps {
    fruit: Fruit;
    viewMode: 'grid' | 'list';
}

export const FruitCard: React.FC<FruitCardProps> = ({ fruit, viewMode }) => {
    const [imgSrc, setImgSrc] = useState<string>(fruit.imageUrl);

    const formattedPrice = `$${Number(fruit.price).toFixed(2)}`;

    return (
        <article
            className={`fruit-card-fruit-card-${viewMode}`}
            data-testid={`fruit-card-${fruit.id}`}
            style={styles.cardContainer(viewMode)}
        >
            <div
                className="fruit-card-image-wrapper"
                data-testid="fruit-card-image-wrapper"
                style={styles.imageWrapper(viewMode)}
            >
                <img
                    className="fruit-card-image"
                    data-testid="fruit-card-image"
                    src={imgSrc}
                    alt={fruit.name}
                    loading="lazy"
                    onError={() => setImgSrc(FALLBACK_IMAGE)}
                    style={styles.image}
                />
            </div>

            <div
                className="fruit-card-content"
                data-testid="fruit-card-content"
                style={styles.content(viewMode)}
            >
                {viewMode === 'list' ? (
                    <>
                        <div
                            className="fruit-card-text-group"
                            data-testid="fruit-card-text-group"
                            style={styles.textGroup}
                        >
                            <h3
                                className="fruit-card-title"
                                data-testid="fruit-card-title"
                                style={styles.title}
                                title={fruit.name}
                            >
                                {fruit.name}
                            </h3>
                            <p
                                className="fruit-card-description"
                                data-testid="fruit-card-description"
                                style={styles.description}
                                title={fruit.description}
                            >
                                {fruit.description}
                            </p>
                        </div>
                        <span
                            className="fruit-card-price"
                            data-testid="fruit-card-price"
                            style={styles.price}
                        >
              {formattedPrice}
            </span>
                    </>
                ) : (
                    <>
                        <div
                            className="fruit-card-header-row"
                            data-testid="fruit-card-header-row"
                            style={styles.headerRowGrid}
                        >
                            <h3
                                className="fruit-card-title"
                                data-testid="fruit-card-title"
                                style={styles.title}
                                title={fruit.name}
                            >
                                {fruit.name}
                            </h3>
                            <span
                                className="fruit-card-price"
                                data-testid="fruit-card-price"
                                style={styles.price}
                            >
                {formattedPrice}
              </span>
                        </div>
                        <p
                            className="fruit-card-description"
                            data-testid="fruit-card-description"
                            style={styles.description}
                            title={fruit.description}
                        >
                            {fruit.description}
                        </p>
                    </>
                )}
            </div>
        </article>
    );
};