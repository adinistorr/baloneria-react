import React from 'react';
import OffersList from '../../components/common/OffersList/OffersList';
import './OffersCard.css';

export default function Offers() {
    return (
        <>
            <div className="offers-card-header-background shadow"></div>
            <h1 className="offers-title">Oferte</h1>
            <OffersList isPublic={true} />
        </>
    );
}
