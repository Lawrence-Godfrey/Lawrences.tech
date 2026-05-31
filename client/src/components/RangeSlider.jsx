

const RangeSlider = ({ value, onChange, min, max, step }) => {
    return (
        <div className="relative flex items-center w-72">
            <input id="default-range" type="range" min={min} max={max} step={step} value={value}
                onChange={onChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none
                                   cursor-pointer dark:bg-gray-700" />
            <div className="min-w-[5rem] text-right text-xl mt-4 mt-4"
                style={{ marginLeft: '15px', marginBottom: '17px' }}>
                {value}
            </div>
        </div>
    );
};


export default RangeSlider;
