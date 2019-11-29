import React from 'react';

class Stopwatch extends React.Component<{}, {
    elapsed: number;
    timer: number;
    startTime: string;
}>{
    // state = {
    //     elapsed: 0
    // }

    constructor(props: {}) {
        super(props);

        //if only one state has changed, react will update that and keep the other one unchanged
        this.state = {
            elapsed: 0,
            timer: 0,
            startTime: '0' //inputted by user
        }
    }

    public componentWillUnmount() { //clear the timer right before it is removed
        window.clearInterval(this.state.timer)
    }

    private stop = () => {
        window.clearInterval(this.state.timer);
        this.setState({
            timer: 0,
            elapsed: 0
        })
    }

    private start = () => {
        //set timer
        const timer = window.setInterval(() => { //window.setInterval means browser's setInterval, not NodeJS
            this.setState({
                elapsed: this.state.elapsed + 16 // add second
            })
        }, 16); //every 16 ms

        this.setState({
            elapsed: parseInt(this.state.startTime) * 1000,
            timer: timer
        });
    }

    //this is a change event triggered by input element
    private onStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        this.setState({
            startTime: event.currentTarget.value.replace(/[^0-9]/g, '')
        })
    }

    public render() {
        return (
            <div className="stopwatch">
                {/* if timer is 0, start button, else stop button */}
                {this.state.timer === 0 ?
                    <button onClick={this.start}>Start</button>
                    :
                    <button onClick={this.stop}>Stop</button>

                }

                <p>Start From: <input value={this.state.startTime} onChange={this.onStartTimeChange} /></p>

                <p>{Math.round(this.state.elapsed / 1000)}.{('00' + (this.state.elapsed % 1000)).substr(-3)}</p>
                {/* this.state.elapsed starts time by ms, /1000 to convert displaying as sec */}
                {/* we want to add decimal places for the time, math.round().{this.state.elapsed%1000} adds 3 decimal places*/}
                {/* when the timer starts counting, the unit is still in ms, which takes 1 decimal place, causing the timer to not show 3 decimal places*/}
                {/* add '00' in front of this.state.elapsed % 1000 will turn it to string and show 2 more decimal places, resulting in 5 */}
                {/* finally, .substr(-3) returns the last 3 decimal places of the string*/}
                {/* subtr() is a legacy function, subtring() instead, this also works: .substring(('00' + (this.state.elapsed % 1000)).length - 3) */}
            </div>
        );
    }
}

export default Stopwatch