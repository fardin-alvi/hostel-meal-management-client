import React from 'react';

const ProfileRow = ({ label, value, link, action }) => (
    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
        <div>
            <h3 className="text-gray-600">{label}</h3>
            {link ? (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    {value}
                </a>
            ) : (
                <p className="text-gray-800">{value}</p>
            )}
        </div>
        {action && <div>{action}</div>}
    </div>
);

export default ProfileRow;
