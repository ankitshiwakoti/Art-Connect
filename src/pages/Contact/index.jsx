import React from 'react';
import Title from '../../components/Title';

function Contact() {
    return (
        <div className="container mx-auto px-4 pb-16">
            <Title>Contact</Title>
            <h1 className="text-4xl font-bold text-center mb-8">Stay In Touch</h1>
            <div className="max-w-lg mx-auto">
                <form className="space-y-4">
                    <div>
                        {/* <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label> */}
                        <input type="email" required id="email" name="email" placeholder='Enter your Email' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
                    </div>
                    <div>
                        {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label> */}
                        <input type="text" required id="name" name="name" placeholder='Enter your Name' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
                    </div>
                    <div>
                        {/* <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label> */}
                        <input type="text" required id="subject" name="subject" placeholder='Subject' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
                    </div>
                    <div>
                        {/* <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label> */}
                        <textarea id="message" required name="message" placeholder='Enter your message' rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;