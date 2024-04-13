import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Loader() {
    return (
        <div className="flex items-center justify-center">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-gray-500 mr-2" style={{ fontSize: "1.5em" }} />
            <p>Loading...</p>
        </div>
    );
}

export default Loader;
