

const EmailField = (options) => {

    const className: string = `appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-${options.roundingType}-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`
    return (
        <div>
            <label htmlFor="email-address" className="sr-only">
                Email address
            </label>
            <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={className}
                placeholder="Email address"
            />
        </div>
    )
}

export default EmailField;