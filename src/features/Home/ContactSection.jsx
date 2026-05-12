const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-28 px-6 bg-[#0b0b11]"
    >

      <div className="max-w-3xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-14">

          <h2 className="text-5xl font-bold mb-5">
            Contact{" "}
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Us
            </span>
          </h2>

          <p className="text-gray-400">
            Have questions or feedback? We'd love to hear from you.
          </p>

        </div>

        {/* FORM */}
        <form className="space-y-6">

          {/* NAME */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="
                w-full
                bg-white/5
                border border-white/10
                rounded-xl
                px-5 py-4
                text-white
                outline-none
                focus:border-purple-500
              "
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                bg-white/5
                border border-white/10
                rounded-xl
                px-5 py-4
                text-white
                outline-none
                focus:border-purple-500
              "
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              className="
                w-full
                bg-white/5
                border border-white/10
                rounded-xl
                px-5 py-4
                text-white
                outline-none
                focus:border-purple-500
              "
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Your Message
            </label>

            <textarea
              rows="5"
              placeholder="Write your message..."
              className="
                w-full
                bg-white/5
                border border-white/10
                rounded-xl
                px-5 py-4
                text-white
                outline-none
                focus:border-purple-500
                resize-none
              "
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full
              py-4
              rounded-xl
              bg-gradient-to-r
              from-purple-500
              to-violet-500
              text-white
              font-semibold
              hover:opacity-90
              transition
            "
          >
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
};

export default ContactSection;