import React, { useEffect, useState } from 'react';

type PersonalInfo = {
    imageUrl: string;
    firstName: string;
    lastName: string;
    birthday: string;
    adress: string;
    height: number;
    weight: number;
    index: number;
    position: string;
    candidate: string;
};

const Main: React.FC = () => {
    const [data, setData] = useState<PersonalInfo | null>(null);

    useEffect(() => {
        fetch('https://trello.vimlc.uz/get-personal-info')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            {data && (
                <div className="flex justify-between max-w-[1312px] mx-auto">
                    <div className="flex items-center gap-8">
                        <img src={data.imageUrl} height={288} alt="Profile" />
                        <div className="flex flex-col">
                            <h1 className="text-[44px] mb-8">
                                <span className="font-bold">{data.firstName}</span>
                                <br /> {data.lastName}
                            </h1>
                            <div className="mb-9">
                                <p className="text-xl text-[#495057] flex gap-10">
                                    <span>Тугилган сана:</span>{data.birthday}
                                </p>
                                <p className="text-xl text-[#495057] flex gap-10">
                                    <span>Тугилган жой:</span>{data.adress}
                                </p>
                            </div>
                            <ul className="flex gap-3">
                                <li className="flex flex-col text-xl font-semibold">
                                    Буйи: <span className="font-bold">{data.height}</span>
                                </li>
                                <li className="flex flex-col text-xl font-semibold">
                                    Вазни: <span className="font-bold">{data.weight}</span>
                                </li>
                                <li className="flex flex-col text-xl font-semibold">
                                    Индекс: <span className="font-bold">{data.index}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <p className="text-[#212529] text-xl w-[421px] leading-8">
                            <span>Лавозими:</span>
                            <br />
                            {data.position}
                        </p>
                        <p className="text-[#212529] text-xl w-[421px] leading-8">
                            <span>Номзод:</span>
                            <br />
                            {data.candidate}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Main;
