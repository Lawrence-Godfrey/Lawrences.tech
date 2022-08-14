

const EmailField = (options) => {
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
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${options.roundingType} focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
            />
        </div>
    )
}

export default EmailField;