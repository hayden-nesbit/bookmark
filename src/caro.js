import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';



const items = [
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 2',
        caption: 'Slide 2'
    },
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 3',
        caption: 'Slide 3'
    }
];

function doSomething() {

    const CaroCard = (props) => {
        const [activeIndex, setActiveIndex] = useState(0);
        const [animating, setAnimating] = useState(false);

        const next = () => {
            if (animating) return;
            const nextIndex = activeIndex === props.goal.length - 1 ? 0 : activeIndex + 1;
            setActiveIndex(nextIndex);
        }

        const previous = () => {
            if (animating) return;
            const nextIndex = activeIndex === 0 ? props.goal.length - 1 : activeIndex - 1;
            setActiveIndex(nextIndex);
        }

        const goToIndex = (newIndex) => {
            if (animating) return;
            setActiveIndex(newIndex);
        }

        const slides = props.goal.map((item) => {
            let days = (new Date(item.end_date).getTime() - startDate.getTime()) / (1000 * 3600 * 24)

            return (
                <CarouselItem
                    onExiting={() => setAnimating(true)}
                    onExited={() => setAnimating(false)}
                    key={index}
                >
                    <div id={index} className="card border-primary mb-5" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <div>
                                <h5 className="card-title text-center">
                                    {item.title}
                                </h5>
                                {check === true && checkId.includes(item.id) ?
                                    <>
                                        <h4 className="text-center mt-5 mb-5">Nice job!</h4>
                                        <button onClick={() => clearGoal(item.id)} className="btn btn-outline-danger btn-sm text-center mt-3">Clear goal</button>
                                    </>

                                    :
                                    <>
                                        <h1 className="card-title text-center display-1">
                                            {Math.ceil(item.pageCount / days)}
                                        </h1>
                                        <h5 className="card-subtitle mb-2 text-muted text-center">pages/day</h5>
                                        {/* <hr />
                                <h3 className="card-subtitle mb-2 text-muted text-center">{Math.ceil((item.pageCount / days) * 1.5)} </h3>
                                <h6 className="card-subtitle mb-2 text-muted text-center">min/day</h6> */}
                                        <div className="form-check pb-5 text-center">
                                            <input type="checkbox" onClick={() => handleClick(0, true, item.id)} className="form-check-input" id="exampleCheck1" />
                                        </div>

                                        <div>
                                            <DatePicker
                                                onChange={date => setStart(date)}
                                                placeholderText="Select a start date"
                                                selected={startDate}
                                                selectsStart
                                                startDate={startDate}
                                                endDate={endDate}
                                            />
                                            <DatePicker
                                                onChange={date => setEnd(date, item.book_id)}
                                                placeholderText="Select an end date"
                                                selected={endDate}
                                                selectsEnd
                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={startDate}
                                            />
                                            <button onClick={() => clearGoal(item.id)} className="btn btn-outline-danger btn-sm text-center mt-3">Clear goal</button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={props.goal} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        );
    }
}

export default CaroCard;