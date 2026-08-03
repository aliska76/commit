import { useState, useEffect } from 'react';
import { FruitCard } from './components/FruitCard';
import { Pagination } from './components/Pagination/Pagination';
import { useFruits } from './hooks/useFruits';
import { styles } from './App.styles';

function App() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Reset page to 1 whenever search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // Pass dynamic currentPage state to hook
    const { fruits, page, totalPages, isLoading, error } = useFruits(searchQuery, currentPage, 6);

    return (
        <div className="app-container" style={styles.container}>
            <header className="app-header" style={styles.header}>
                <h1 className="app-title" style={styles.title}>Fresh Fruit Market</h1>
                <p className="app-subtitle" style={styles.subtitle}>
                    Full-stack React & NestJS Sandbox App
                </p>
            </header>

            {/* Control Panel */}
            <div className="controls-area" style={styles.controlsArea}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search fruits by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                />

                <div className="view-mode-group" style={styles.viewModeGroup}>
                    <button
                        type="button"
                        className="view-button grid-button"
                        onClick={() => setViewMode('grid')}
                        style={styles.button(viewMode === 'grid')}
                    >
                        Grid Layout
                    </button>
                    <button
                        type="button"
                        className="view-button list-button"
                        onClick={() => setViewMode('list')}
                        style={styles.button(viewMode === 'list')}
                    >
                        List Layout
                    </button>
                </div>
            </div>

            {/* Network States */}
            {isLoading && (
                <div className="state-loading" style={styles.loadingState}>
                    ⏳ Loading delicious fruits...
                </div>
            )}

            {error && (
                <div className="state-error" style={styles.errorState}>
                    ⚠️ Error: {error}
                </div>
            )}

            {/* Content Rendering */}
            {!isLoading && !error && (
                fruits.length === 0 ? (
                    <div className="state-empty" style={styles.emptyState}>
                        No fruits match your search criteria.
                    </div>
                ) : (
                    <>
                        <div className="fruit-grid" style={styles.grid(viewMode)}>
                            {fruits.map((fruit) => (
                                <FruitCard key={fruit.id} fruit={fruit} viewMode={viewMode} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={page ?? currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )
            )}
        </div>
    );
}

export default App;