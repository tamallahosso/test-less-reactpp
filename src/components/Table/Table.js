import React from "react";
import PropTypes from "prop-types";
import "./Table.css"
import classNames from "classnames";

export function Table({data, onInFavoritesClick, favorites}) {
    const columns = ['Валюта', 'Курс, грн', 'Избранное']

    const inFavorite = (id) => {
        const favoriteIds = []
        favorites.forEach(item => {
            favoriteIds.push(item['r030'])
        })
        return favoriteIds.includes(id)
    }

    return (<table>
        <thead>
        <tr>{columns.map((elem, idx) => {
            return <th key={idx}>{elem}</th>
        })}</tr>
        </thead>
        <tbody>
        {data.map((elem, i) => {
            return <tr key={i}>
                <td>{`${elem['cc']} - ${elem['txt']}`}</td>
                <td>{elem.rate}</td>
                <td>
                    <button className={classNames('favorite-btn', {inFavorite: inFavorite(elem['r030'])})}
                            onClick={() => onInFavoritesClick(elem)}>{!inFavorite(elem['r030']) ? 'Добавить' : 'Удалить'}</button>
                </td>
            </tr>
        })}
        </tbody>
    </table>)
}

Table.propTypes = {
    data: PropTypes.array,
    onInFavoritesClick: PropTypes.func,
    favorites: PropTypes.array,
};

Table.defaultProps = {
    data: [],
    favorites: [],
    onInFavoritesClick: () => {
    }
};