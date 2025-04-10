/* eslint-disable eqeqeq */
/* eslint-disable func-names */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import RingLoader from 'react-spinners/RingLoader';
import ByDayStrikeRate from '../../graph/ByDayStrikeRate';
import CommonPieChart from '../../graph/CommonPieChart';
import MultiSelectComponents from '../../graph/MultiSelectComponents';
import Posm from '../../graph/Posm';
import StrikeRateBreakdown from '../../graph/StrikeRateBreakdown';
import UniqueOutletsCovered from '../../graph/UniqueOutletsCovered';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import './dashboard.css';

function Dashboard() {
    const [newData, setData] = useState([]);

    const [value, setValue] = useState();
    const [todaysData, setTodaysData] = useState(true);

    const [live, setLive] = useState(true);
    const [disableFilter, setDisableFilter] = useState(false);

    const [loading, setLoading] = useState(true);
    const [filterData, setFilterData] = useState([]);

    // search filter data store
    const [selectedRegion, setSelectedRegion] = useState([]);
    const [selectedArea, setSelectedArea] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState([]);
    const [selectedTerritory, setSelectedTerritory] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState([]);
    const [action, setAction] = useState(false);

    const handleSelect = (selectedList, eventName) => {
        if (eventName === 'regionList') {
            setAction((prev) => !prev);
            setSelectedRegion(selectedList);
            setSelectedArea([]);
            setSelectedTerritory([]);
            setSelectedHouse([]);
            setSelectedPoint([]);
        }
        if (eventName === 'areaList') {
            setAction((prev) => !prev);
            setSelectedArea(selectedList);
            setSelectedTerritory([]);
            setSelectedHouse([]);
            setSelectedPoint([]);
        }
        if (eventName === 'territoryList') {
            setAction((prev) => !prev);
            setSelectedTerritory(selectedList);
            setSelectedHouse([]);
            setSelectedPoint([]);
        }
        if (eventName === 'dhList') {
            setAction((prev) => !prev);
            setSelectedHouse(selectedList);
            setSelectedPoint([]);
        }
        if (eventName === 'pointList') setSelectedPoint(selectedList);
    };

    const data = useMemo(() => {
        const object = [
            selectedRegion,
            selectedArea,
            selectedTerritory,
            selectedHouse,
            selectedPoint,
        ].reduce((prev, current, index) => {
            if (index === 0) {
                return current.length > 0
                    ? { ...prev, regionId: current.map((o) => o.value) }
                    : prev;
            }
            if (index === 1) {
                return current.length > 0 ? { ...prev, areaId: current.map((o) => o.value) } : prev;
            }
            if (index === 2) {
                return current.length > 0
                    ? { ...prev, territoryId: current.map((o) => o.value) }
                    : prev;
            }
            if (index === 3) {
                return current.length > 0 ? { ...prev, dhId: current.map((o) => o.value) } : prev;
            }
            if (index === 4) {
                return current.length > 0
                    ? { ...prev, pointId: current.map((o) => o.value) }
                    : prev;
            }
        }, {});
        return object;
    }, [selectedRegion, selectedArea, selectedTerritory, selectedHouse, selectedPoint]);

    const onSubmit = () => {
        setLoading(true);
        let period = {
            from: '',
            to: '',
        };
        if (Boolean(value) === true) {
            if (!value || value.length === 2 || value.length === 1) {
                const [from, to] = value;
                period = {
                    from: new Date(from.unix * 1000).toISOString().replace(/T[^\n]+/gm, ''),
                    to:
                        value.length === 2
                            ? new Date(to.unix * 1000).toISOString().replace(/T[^\n]+/gm, '')
                            : new Date(from.unix * 1000).toISOString().replace(/T[^\n]+/gm, ''),
                };
            }
        }

        const newDate = {};
        if (period.from) {
            newDate.from = period.from;
        }
        if (period.to) {
            newDate.to = period.to;
        }

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            campaignType: 'Tobacco',
            selectedCampaign: '67a502ebb6ef196494989e84',
            ...newDate,
            ...data,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('https://comm.hedigital.net/api/v1/dashboard/secondary', requestOptions)
            .then((res) => res.json())
            .then((doc) => {
                // if (data.length > 7) data.push(...data.splice(2, 1));
                setData(doc.data);
                setLoading(false);

                setLive((prev) => {
                    let liveRes = prev;
                    const today = new Date();
                    const dd = String(today.getDate()).padStart(2, '0');
                    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                    const yyyy = today.getFullYear();
                    const todayDate = `${yyyy}-${mm}-${dd}`;

                    if (period.dateFrom === todayDate && period.dateTo === todayDate) {
                        liveRes = true;
                    } else if (period.dateFrom === '' && period.dateTo === '') {
                        liveRes = true;
                    } else {
                        liveRes = false;
                    }
                    return liveRes;
                });
            });
    };

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            campaignType: 'Tobacco',
            selectedCampaign: '67a502ebb6ef196494989e84',
            ...data,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        setDisableFilter(true);
        fetch('https://comm.hedigital.net/api/v1/data-management/all-campaignwise', requestOptions)
            .then((res) => res.json())
            .then((d) => {
                setFilterData({ ...filterData, ...d.data });
                setDisableFilter(false);
            });
    }, [data, action]);

    useEffect(() => {
        setData([]);
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            campaignType: 'Tobacco',
            selectedCampaign: '67a502ebb6ef196494989e84',
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch('https://comm.hedigital.net/api/v1/dashboard/secondary', requestOptions)
            .then((res) => res.json())
            .then((doc) => {
                setData(doc.data);
                setLoading(false);
                setLive(true);
            });
    }, [todaysData]);

    function percentCalculate(a, b) {
        return ((a / (a + b)) * 100 || 0).toFixed(2);
    }

    return (
        <div className="dashboard-with-header-footer">
            <NavBar value={value} setValue={setValue} live={live} setTodaysData={setTodaysData} />
            <div className="dashboard-main-container">
                <div
                    style={{
                        width: '98%',
                        margin: '0 auto',
                        // background: '#ddbd57',
                    }}
                >
                    <MultiSelectComponents
                        handleSelect={handleSelect}
                        filterData={filterData}
                        selectedRegion={selectedRegion}
                        selectedArea={selectedArea}
                        selectedHouse={selectedHouse}
                        selectedTerritory={selectedTerritory}
                        selectedPoint={selectedPoint}
                        submitEvent={onSubmit}
                        loading={loading}
                        disableFilter={disableFilter}
                        value={value}
                        setValue={setValue}
                        live={live}
                        setTodaysData={setTodaysData}
                    />

                    {loading ? (
                        <div className="loader">
                            <RingLoader color="#03A28F" loading={loading} size={180} />
                        </div>
                    ) : (
                        <>
                            <Row className="main-container">
                                <Col md={8} sm={12}>
                                    <div className="ibox">
                                        <div className="ibox-title">Strike Rate Breakdown</div>
                                        <div className="ibox-content">
                                            <StrikeRateBreakdown
                                                data={newData?.strike_rate_breakdown || []}
                                            />
                                        </div>
                                    </div>
                                </Col>

                                <Col md={4} sm={12}>
                                    <div className="ibox">
                                        <div className="ibox-title">Total Strike Rate</div>
                                        <div className="ibox-content single-content">
                                            <p>{Math.round(newData?.strike_rate || 0)}%</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {newData?.targetsByDay ? (
                                <Row>
                                    <Col>
                                        <div className="ibox">
                                            <div className="ibox-title">By Day Strike Rate</div>
                                            <div className="ibox-content">
                                                <ByDayStrikeRate
                                                    strikeRateData={newData?.targetsByDay || []}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            ) : null}

                            <Row>
                                <Col md={12} sm={12} lg={8}>
                                    <div className="ibox">
                                        <div className="ibox-title">Unique Outlets Covered</div>
                                        <div className="ibox-content">
                                            <UniqueOutletsCovered
                                                data={newData?.unique_outlet_covered || []}
                                            />
                                        </div>
                                    </div>
                                </Col>

                                <Col md={12} sm={12} lg={4}>
                                    <div className="ibox">
                                        <div className="ibox-title">
                                            Total Unique Outlets Covered
                                        </div>
                                        <div className="ibox-content">
                                            <CommonPieChart
                                                totalWithTitle={
                                                    (
                                                        newData.total_unique_outlet_covered
                                                            .covered +
                                                        newData.total_unique_outlet_covered
                                                            .unConvered
                                                    ).toLocaleString() || 0
                                                }
                                                positive={
                                                    newData?.total_unique_outlet_covered?.covered ||
                                                    0
                                                }
                                                negative={
                                                    newData?.total_unique_outlet_covered
                                                        ?.unConvered || 0
                                                }
                                                posValueText="Covered Outlets"
                                                negValueText="Remaining Outlets"
                                                posP={percentCalculate(
                                                    newData.total_unique_outlet_covered.covered,
                                                    newData.total_unique_outlet_covered.unConvered
                                                )}
                                                negP={percentCalculate(
                                                    newData.total_unique_outlet_covered.unConvered,
                                                    newData.total_unique_outlet_covered.covered
                                                )}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row style={{ marginBottom: '20px' }}>
                                <Col>
                                    <div className="ai-title">AI Evaluation</div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6} sm={12} lg={4}>
                                    <div className="ibox">
                                        <div className="ibox-title">Valid GHW</div>
                                        <div className="ibox-content">
                                            <CommonPieChart
                                                val={
                                                    (newData.GHWAndValidSeq['Combined GHW'].Yes ||
                                                        0) +
                                                    (newData.GHWAndValidSeq['Combined GHW'].No || 0)
                                                }
                                                totalWithTitle=" Unique Outlets"
                                                positive={
                                                    newData.GHWAndValidSeq['Combined GHW'].Yes
                                                }
                                                negative={newData.GHWAndValidSeq['Combined GHW'].No}
                                                posP={percentCalculate(
                                                    newData.GHWAndValidSeq['Combined GHW'].Yes,
                                                    newData.GHWAndValidSeq['Combined GHW'].No
                                                )}
                                                negP={percentCalculate(
                                                    newData.GHWAndValidSeq['Combined GHW'].No,
                                                    newData.GHWAndValidSeq['Combined GHW'].Yes
                                                )}
                                                posValueText="Yes"
                                                negValueText="No"
                                            />
                                        </div>
                                    </div>
                                </Col>

                                <Col md={6} sm={12} lg={4}>
                                    <div className="ibox">
                                        <div className="ibox-title">Planogram Valid Sequence</div>
                                        <div className="ibox-content">
                                            <CommonPieChart
                                                val={
                                                    (newData.GHWAndValidSeq[
                                                        'Planogram Valid Sequence'
                                                    ].Yes || 0) +
                                                    (newData.GHWAndValidSeq[
                                                        'Planogram Valid Sequence'
                                                    ].No || 0)
                                                }
                                                totalWithTitle=" Unique Outlets"
                                                positive={
                                                    newData.GHWAndValidSeq[
                                                        'Planogram Valid Sequence'
                                                    ].Yes
                                                }
                                                negative={
                                                    newData.GHWAndValidSeq[
                                                        'Planogram Valid Sequence'
                                                    ].No
                                                }
                                                posP={percentCalculate(
                                                    newData.GHWAndValidSeq[
                                                        'Planogram Valid Sequence'
                                                    ].Yes,
                                                    newData.GHWAndValidSeq[
                                                        'Planogram Valid Sequence'
                                                    ].No
                                                )}
                                                negP={percentCalculate(
                                                    newData.GHWAndValidSeq[
                                                        'Planogram Valid Sequence'
                                                    ].No,
                                                    newData.GHWAndValidSeq[
                                                        'Planogram Valid Sequence'
                                                    ].Yes
                                                )}
                                                posValueText="Yes"
                                                negValueText="No"
                                            />
                                        </div>
                                    </div>
                                </Col>

                                <Col md={6} sm={12} lg={4}>
                                    <div className="ibox">
                                        <div className="ibox-title">POSM Detected</div>
                                        <div className="ibox-content">
                                            <CommonPieChart
                                                val={
                                                    (newData.posmDetectedData.posmDetected || 0) +
                                                    (newData.posmDetectedData.posmNotDetected || 0)
                                                }
                                                totalWithTitle=" POSM Used"
                                                positive={newData.posmDetectedData.posmDetected}
                                                negative={newData.posmDetectedData.posmNotDetected}
                                                posP={percentCalculate(
                                                    newData.posmDetectedData.posmDetected,
                                                    newData.posmDetectedData.posmNotDetected
                                                )}
                                                negP={percentCalculate(
                                                    newData.posmDetectedData.posmNotDetected,
                                                    newData.posmDetectedData.posmDetected
                                                )}
                                                posValueText="Yes"
                                                negValueText="No"
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row md={1} lg={1} className="pb-5">
                                <Col>
                                    <div className="ibox">
                                        <div className="ibox-title">POSM Usage</div>
                                        <div className="ibox-content">
                                            <Posm usagesData={newData?.posmUsage || []} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    )}
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
