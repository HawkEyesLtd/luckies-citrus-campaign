/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import DatePicker from 'react-multi-date-picker';
import { MultiSelect } from 'react-multi-select-component';
import calendarIcon from '../assets/calendar.png';
import filterIcon from '../assets/filter.png';
import './graph.css';

function MultiSelectComponents({
    handleSelect,
    filterData,
    selectedRegion,
    selectedArea,
    selectedHouse,
    selectedTerritory,
    selectedPoint,
    submitEvent,
    loading,
    disableFilter,
    value,
    setValue,
}) {
    const datePickerRef = useRef();
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [show, setShow] = useState(true);

    const detectWindowSize = () => {
        setWindowSize(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', detectWindowSize);

        return () => {
            window.removeEventListener('resize', detectWindowSize);
        };
    }, [windowSize]);

    if (filterData.length <= 0) return null;

    const closeCalender = () => {};

    const dataFunc = (date) => {
        if (date.length === 2) {
            setShow(false);
        }
        if (date.length === 1) {
            setShow(true);
        }
        setValue(date);
        return false;
    };

    return (
        <div className="multiselect-main-container">
            <div className="multiselect-content">
                <Row md={3} lg={4} xl={4} sm={2} xs={1}>
                    <Col>
                        <p className="region custom-p">Region</p>
                        <MultiSelect
                            hasSelectAll
                            options={filterData.regionList?.length && filterData.regionList}
                            value={selectedRegion}
                            onChange={(...args) => handleSelect(...args, 'regionList')}
                            labelledBy="Select"
                            className="multiselect-input"
                            disabled={disableFilter}
                            overrideStrings={{ allItemsAreSelected: 'All' }}
                        />
                    </Col>
                    <Col>
                        <p className="custom-p">Area</p>
                        <MultiSelect
                            hasSelectAll
                            options={filterData.areaList?.length && filterData.areaList}
                            value={selectedArea}
                            onChange={(...args) => handleSelect(...args, 'areaList')}
                            labelledBy="Select"
                            className="multiselect-input"
                            disabled={disableFilter}
                            overrideStrings={{ allItemsAreSelected: 'All' }}
                        />
                    </Col>
                    <Col>
                        <p className="custom-p">Territory</p>
                        <MultiSelect
                            hasSelectAll
                            options={filterData.territoryList?.length && filterData.territoryList}
                            value={selectedTerritory}
                            onChange={(...args) => handleSelect(...args, 'territoryList')}
                            labelledBy="Select"
                            className="multiselect-input"
                            disabled={disableFilter}
                            overrideStrings={{ allItemsAreSelected: 'All' }}
                        />
                    </Col>
                    <Col>
                        <p className="custom-p">Distribution House</p>
                        <MultiSelect
                            hasSelectAll
                            options={filterData.dhList?.length && filterData.dhList}
                            value={selectedHouse}
                            onChange={(...args) => handleSelect(...args, 'dhList')}
                            labelledBy="Select"
                            className="multiselect-input"
                            disabled={disableFilter}
                            overrideStrings={{ allItemsAreSelected: 'All' }}
                        />
                    </Col>
                    <Col>
                        <p className="custom-p">Distribution Point</p>
                        <MultiSelect
                            hasSelectAll
                            options={filterData.pointList?.length && filterData.pointList}
                            value={selectedPoint}
                            onChange={(...args) => handleSelect(...args, 'pointList')}
                            labelledBy="Select"
                            className="multiselect-input"
                            disabled={disableFilter}
                            overrideStrings={{ allItemsAreSelected: 'All' }}
                        />
                    </Col>
                    <Col>
                        <div className="cal-con" style={{ width: '100%' }}>
                            <p className="custom-p">Date Range</p>
                            <DatePicker
                                value={value}
                                onChange={dataFunc}
                                inputClass="custom-input"
                                numberOfMonths={windowSize < 540 ? 1 : 2}
                                placeholder="Date Range"
                                range
                                // plugins={[<Footer position="bottom" />]}
                                format="DD/MM/YYYY"
                                mapDays={({ date }) => {
                                    const props = {};
                                    const isWeekend = [5].includes(date.weekDay.index);

                                    if (isWeekend) props.className = 'highlight highlight-red';

                                    return props;
                                }}
                                ref={datePickerRef}
                                onClose={() => closeCalender()}
                            />
                            {show && (
                                <div>
                                    <img
                                        src={calendarIcon}
                                        alt="icon"
                                        className="calender-icon"
                                        width="20"
                                        onClick={() => datePickerRef.current.openCalendar()}
                                    />
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col>
                        <p className="custom-p" style={{ visibility: 'hidden' }}>
                            Query
                        </p>
                        {loading ? (
                            <button
                                type="button"
                                className="custom-button"
                                style={{ cursor: 'no-drop' }}
                            >
                                <img src={filterIcon} alt="filter" width="15" />
                                &nbsp; Loading...
                            </button>
                        ) : (
                            <button type="button" className="custom-button" onClick={submitEvent}>
                                <img src={filterIcon} alt="filter" width="15" />
                                &nbsp; Filter
                            </button>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default MultiSelectComponents;
