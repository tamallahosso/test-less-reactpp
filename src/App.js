import React, {useEffect, useState} from "react";

import './App.css'
import {Table} from "./components/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {getAllCurrencyAction} from "./redux/actions/actionsCreators";
import classNames from "classnames";

export function App() {
    const dispatch = useDispatch()
    const currency = useSelector(state => state.currencyReducer.currency)
    const isLoading = useSelector(state => state.currencyReducer.isLoading)
    const [activeTab, setActiveTab] = useState(1)
    const [favorites, setFavorites] = useState([])


    useEffect(() => {
        const oldFavorites = getFavoritesFromLS() || []
        setFavorites(oldFavorites)
    }, [])

    useEffect(() => {
        addFavoritesToLS(favorites)
    }, [favorites])

    useEffect(() => {
        dispatch(getAllCurrencyAction())
    }, [])


    const tabs = [
        {
            index: 1,
            name: 'Все валюты',
            data: currency
        },
        {
            index: 2,
            name: 'Избранное',
            data: favorites
        }
    ]

    function inFavorite(id) {
        const favoriteIds = []
        if (favorites.length) {
            favorites.forEach(item => {
                favoriteIds.push(item['r030'])
            })
            return favoriteIds.includes(id)
        } else {
            return false
        }

    }

    function onTabClick(tabIndex) {
        setActiveTab(tabIndex)
    }

    function onInFavoritesClick(elem) {
        if (inFavorite(elem['r030'])) {
            setFavorites(prev => prev.filter((item) => item['r030'] !== elem['r030']))
        } else {
            setFavorites(prev => [...prev, elem])
        }
    }

    function addFavoritesToLS(data) {
        localStorage.setItem('favorites', JSON.stringify(data))
    }

    function getFavoritesFromLS() {
        return JSON.parse(localStorage.getItem('favorites'))
    }

    function renderTable(data) {
        if (data.length) {
            return <Table data={data} onInFavoritesClick={onInFavoritesClick} inFavorite={inFavorite}/>
        } else {
            return <div className="message">Вы пока ничего не добавили</div>
        }
    }

    function renderTabHeader() {
        return <div className='tab-header'>{tabs.map((tab) => {
            return <span className={classNames('tab-item', {'active-tab': tab.index === activeTab})} key={tab.index}
                         onClick={() => onTabClick(tab.index)}>{tab.name}</span>
        })}</div>
    }

    function renderOptions() {
        return <div className="options-panel">
            <button onClick={() => dispatch(getAllCurrencyAction())} className="refresh-btn">Обновить</button>
        </div>
    }

    function renderTabs() {
        if (activeTab === 1) {
            return renderTable(currency)
        } else if (activeTab === 2) {
            return renderTable(favorites)
        }
    }

    return (
        <div className="App">
            {renderTabHeader()}
            {renderOptions()}
            {!isLoading ? renderTabs() : <span className='loading'>Loading...</span>}
        </div>
    );
}








