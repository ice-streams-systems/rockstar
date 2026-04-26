// - Photo bank -
// All available shop photos. Add new ones here as they come in.
const photos = {
    shop_floor:   { src: './images/Hoods_Up_Shop.jpg', alt: 'Rockstar Auto Repair shop floor' },
    engine_work:  { src: './images/Car_Work.jpg',      alt: 'Engine service in progress' },
    lexus:        { src: './images/Jeep_Inside.jpg',   alt: 'Vehicle in for service' },
    jeep_art:     { src: './images/Building_Jeep.jpg', alt: 'Rockstar Auto Repair' },
    boost:        { src: './images/BoostXS.jpg',       alt: 'Shop' },
    mech:         { src: './images/Mech.jpg',          alt: 'Mechanic at work' },
};

// - Helper: renders a photo strip for service pages -
function photoStrip(...keys) {
    const imgs = keys.map(k =>
        `<img src="${photos[k].src}" alt="${photos[k].alt}" class="service-photo">`
    ).join('');
    return `<div class="service-photos">${imgs}</div>`;
}

const contentMap = {
    homepage: `
        <div class="homepage-wrap">
          <div class="homepage-intro">
            <h2>Welcome to Rockstar Auto Repair</h2>
            <p>Quality work, honest pricing, and a passion for every vehicle that comes through the door. Located in downtown Benton Harbor, Michigan — we keep your car road-ready so you can drive with confidence.</p>
          </div>
          <div class="welcome-images">
            <img src="${photos.boost.src}" alt="${photos.boost.alt}" class="homepage-image">
            <img src="${photos.mech.src}"  alt="${photos.mech.alt}"  class="homepage-image">
          </div>
        </div>
        `,

    services: `
        <h2>Services</h2>
        ${photoStrip('shop_floor', 'engine_work')}
        <p>At RockStar Auto Repair, we believe every vehicle deserves the best care, and every customer deserves peace of mind. From routine maintenance to complex repairs, we offer a comprehensive range of services to keep your car running smoothly, safely, and efficiently.</p>
        <ul>
            <li>Engine Care</li>
            <li>Steering &amp; Suspension</li>
            <li>Brake Services</li>
            <li>Exhaust Systems</li>
            <li>Cooling Systems</li>
            <li>Oil Changes &amp; Tune-Ups</li>
        </ul>
        <p>Visit the service sections in the dropdown for more details on each service.</p>
        `,

    request: `
        <div class="form-page">
          <h2>Request Service</h2>
          <form id="request-form">
            <div class="field">
              <label for="req-name">Full Name</label>
              <input type="text" id="req-name" name="name" required>
            </div>
            <div class="field">
              <label for="req-phone">Phone Number</label>
              <input type="tel" id="req-phone" name="phone" placeholder="(269) 000-0000" required>
            </div>
            <div class="field">
              <label for="req-email">Email</label>
              <input type="email" id="req-email" name="email" required>
            </div>
            <div class="field">
              <label for="req-year">Year</label>
              <input type="text" id="req-year" name="year" placeholder="e.g. 2018" maxlength="4" required>
            </div>
            <div class="field">
              <label for="req-make">Make</label>
              <input type="text" id="req-make" name="make" placeholder="e.g. Ford" required>
            </div>
            <div class="field full">
              <label for="req-model">Model</label>
              <input type="text" id="req-model" name="model" placeholder="e.g. F-150" required>
            </div>
            <div class="field full">
              <label for="req-service">Service Required</label>
              <textarea id="req-service" name="service" placeholder="Describe what you need..."></textarea>
            </div>
            <button type="submit">Submit Request</button>
          </form>
        </div>
        `,

    estimate: `
        <div class="form-page">
          <h2>Free Estimate</h2>
          <form id="estimate-form">
            <div class="field">
              <label for="est-name">Full Name</label>
              <input type="text" id="est-name" name="name" required>
            </div>
            <div class="field">
              <label for="est-phone">Phone Number</label>
              <input type="tel" id="est-phone" name="phone" placeholder="(269) 000-0000" required>
            </div>
            <div class="field">
              <label for="est-email">Email</label>
              <input type="email" id="est-email" name="email" required>
            </div>
            <div class="field">
              <label for="est-year">Year</label>
              <input type="text" id="est-year" name="year" placeholder="e.g. 2018" maxlength="4" required>
            </div>
            <div class="field">
              <label for="est-make">Make</label>
              <input type="text" id="est-make" name="make" placeholder="e.g. Ford" required>
            </div>
            <div class="field full">
              <label for="est-model">Model</label>
              <input type="text" id="est-model" name="model" placeholder="e.g. F-150" required>
            </div>
            <div class="field full">
              <label for="est-service">Work Needed</label>
              <textarea id="est-service" name="service" placeholder="Describe the work you need estimated..."></textarea>
            </div>
            <button type="submit">Request Estimate</button>
          </form>
        </div>
        `,

    specials: `
        <h2>Our Prices</h2>
        <p>Straightforward pricing with no surprises. Questions? Give us a call at (269) 313-6918.</p>
        <div class="price-grid">

            <div class="price-card">
                <span class="price-service">5 Quart Oil Change with Filter</span>
                <span class="price-amount">$79.99 <span class="price-note">+ tax</span></span>
            </div>

            <div class="price-card">
                <span class="price-service">Complete Vehicle Inspection</span>
                <span class="price-amount">$50.00</span>
            </div>

            <div class="price-card">
                <span class="price-service">TPMS Sensor Replacement</span>
                <span class="price-amount">$60.25 <span class="price-note">per sensor</span></span>
            </div>

            <div class="price-card">
                <span class="price-service">Tire Mount and Balance</span>
                <span class="price-amount">$25.00 <span class="price-note">per tire, includes new valve stem</span></span>
            </div>

            <div class="price-card">
                <span class="price-service">Tire Balance</span>
                <span class="price-amount">$40.00</span>
            </div>

            <div class="price-card">
                <span class="price-service">Tire Repair</span>
                <span class="price-amount">$35.00</span>
            </div>

            <div class="price-card">
                <span class="price-service">Front Brakes</span>
                <span class="price-amount">$130.00 <span class="price-note">+ parts</span></span>
            </div>

            <div class="price-card">
                <span class="price-service">Rear Brakes</span>
                <span class="price-amount">$169.00 <span class="price-note">+ parts</span></span>
            </div>

            <div class="price-card">
                <span class="price-service">Coolant Exchange</span>
                <span class="price-amount">$140.00</span>
            </div>

            <div class="price-card">
                <span class="price-service">Alignment <span class="price-note">(drop off only)</span></span>
                <span class="price-amount">$130.00</span>
            </div>

            <div class="price-card">
                <span class="price-service">Differential Service</span>
                <span class="price-amount">$130.00</span>
            </div>

        </div>
        `,

    reviews: `
        <h2>Customer Reviews</h2>
        <p>See what our customers have to say about our services:</p>
        <div class="reviews-grid">
            <div class="review-card">
                <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ftyler.poschke%2Fposts%2Fpfbid02R85ff86gfRi1zEscGEYhP4qj52TWMfGbmt6xoZsaEgSgVjWj5GjNjG5gh6wiH9LPl&show_text=true&width=500" width="500" height="186" style="border:none;overflow:hidden;width:100%;height:100%;" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            </div>
            <div class="review-card">
                <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fakrieger12%2Fposts%2Fpfbid02FAgpmcpENaeKbMrttST6UBgxTWkvzR4RT7MEpw8iKvbAWR42aBE7xVZ9LGxXRdMGl&show_text=true&width=500" width="500" height="169" style="border:none;overflow:hidden;width:100%;height:100%;" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            </div>
            <div class="review-card">
                <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0ybzKZb5HsavdAKJUAtDoidxUydnCKUzH3p1SgLMpQh7AdGbVFxDt7gAjk27QEj9el%26id%3D100014068772476&show_text=true&width=500" width="500" height="250" style="border:none;overflow:hidden;width:100%;height:100%;" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            </div>
        </div>
        `,

    steering: `
        <h2>Steering</h2>
        ${/* photoStrip('lexus') — image removed, placeholder for future photo */''}
        <p>Your steering system is vital to your safety and your driving experience. When it starts making unusual noises like popping and squeaking, becomes harder to turn, or leaks red or clear fluid, it's a clear sign that professional attention is needed. At Rockstar Auto Repair, we understand the importance of responsive, reliable steering, and we're here to help you maintain it.</p>
        <h5>Common Steering Problems</h5>
        <p>Over time, power steering systems can accumulate debris, fluid contaminants, or wear and tear on components like the pump, hoses, or rack and pinion. Left unchecked, these issues can lead to costly repairs—or worse, a complete loss of steering control. Warning signs include:</p>
        <ul>
            <li>Difficulty turning the wheel</li>
            <li>Strange noises while steering</li>
            <li>Visible fluid leaks</li>
            <li>Uneven or wandering steering behavior</li>
        </ul>
        <h5>Power Steering System Maintenance</h5>
        <p>Keeping your power steering system clean and well-maintained is the best way to avoid expensive failures. Our technicians recommend a full system flush at least every 50,000 miles to remove contaminants and replace degraded fluid.</p>
        <h5>Comprehensive Steering Inspections</h5>
        <p>Our expert mechanics will thoroughly inspect your steering system, including the power steering pump, steering linkages, hoses, and belts. If we find worn or damaged components, we'll recommend repairs or replacements to get your system back to peak performance.</p>
        <p>Steering shouldn't feel like a workout — let Rockstar Auto Repair keep your system smooth, responsive, and reliable.</p>
        `,

    suspension: `
        <h2>Suspension</h2>
        <p>Your car's suspension system does more than just smooth out bumps — it's crucial for maintaining control and safety on the road. Worn-out suspension components can lead to an uncomfortable ride, reduced handling, and even longer stopping distances.</p>
        <h5>Signs of a Suspension Problem</h5>
        <p>Suspension systems are made up of many components — shocks, struts, springs, and control arms — all working together to keep your vehicle stable. Common symptoms include:</p>
        <ul>
            <li>Excessive bouncing or swaying after hitting bumps</li>
            <li>Difficulty steering or maintaining control</li>
            <li>Uneven tire wear</li>
            <li>A noticeable "nose dive" when braking</li>
            <li>Clunking or knocking noises over bumps</li>
        </ul>
        <h5>Suspension Maintenance and Repairs</h5>
        <p>Our certified technicians will perform a detailed inspection of your suspension system to identify worn or damaged components. Whether you need new shocks, struts, or bushings, we use only high-quality parts to restore your ride's comfort and handling.</p>
        <h5>Why Suspension Matters</h5>
        <p>A healthy suspension isn't just about comfort — it's about safety. Properly functioning shocks and struts help keep your tires in contact with the road, ensuring better control and stopping power.</p>
        `,

    brakes: `
        <h2>Brakes and Tires</h2>
        ${photoStrip('engine_work', 'shop_floor')}
        <p>Your vehicle's brakes play a critical role in keeping you and your family safe — and they can even save you money in the long run. Over time, brakes wear down due to friction, heat, and everyday use.</p>
        <p>When your brake pads wear out, it leads to metal-on-metal contact, which can quickly damage the more expensive rotors, drums, or even the calipers. Warning signs include squealing, grinding, longer stopping distances, or fluid leaking near the wheels.</p>
        <p>While brakes keep you safe when stopping, your tires are the foundation of your vehicle's performance and safety on the road. Tires with proper tread and inflation ensure better handling, fuel efficiency, and braking distance, especially during wet or slippery conditions.</p>
        <p>At RockStar Auto Repair, we've got you covered with a comprehensive lineup of tire services. Whether you need new tires, tire repairs, rotation, balancing, or even just a quick pressure check, our expert technicians are ready to help.</p>
        <p>When you bring your vehicle to RockStar Auto Repair, you're choosing trusted professionals who take care of your brakes, tires, and overall safety. Regular checkups not only save you money but also give you peace of mind on every drive.</p>
        `,

    radiators: `
        <h2>Cooling Systems</h2>
        <p>Over time, radiator tanks can develop cracks, causing coolant leaks. If left unchecked, these leaks can lead to overheating and expensive repairs. Regular maintenance and inspections are key to preventing these issues before they become major problems.</p>
        <h5>Comprehensive Cooling System Inspections</h5>
        <p>Our certified technicians perform thorough inspections of your vehicle's entire cooling system. We check for cracks, corrosion, loose or leaky hoses, and any other potential damage.</p>
        <h5>Pressure Testing for Leaks</h5>
        <p>If a coolant leak is suspected, we conduct a pressure test to pinpoint the issue. This includes checking your radiator cap and hoses to ensure the system is sealed properly.</p>
        <h5>Radiator Flush and Maintenance</h5>
        <p>Our radiator services include a full system flush to remove old coolant, debris, and contaminants. We then refill your system with the appropriate antifreeze or coolant mixture, ensuring the delicate balance needed for maximum efficiency.</p>
        <p>At RockStar Auto Repair, we understand the importance of a reliable cooling system. Don't let a faulty cooling system leave you stranded.</p>
        `,

    tuneups: `
        <h2>Tune Ups</h2>
        <p>Your vehicle performs best when all its parts are in harmony. Our comprehensive tune-up services ensure your car stays in peak condition, giving you the reliability and performance you need.</p>
        <h5>Spark Plug Replacement</h5>
        <p>Spark plugs are essential for starting your car and ensuring smooth engine performance. Over time, they wear out, leading to poor fuel efficiency, engine misfires, and vibrations. We replace worn spark plugs with high-quality parts, ensuring a clean and powerful start every time.</p>
        <h5>Fuel System Cleaning</h5>
        <p>Sluggish performance and poor fuel economy often result from dirty fuel injectors or carbon buildup in the throttle body. Our specialized cleaning service restores your fuel system, ensuring smooth engine operation and optimal efficiency.</p>
        <h5>Performance Check</h5>
        <p>Our tune-ups include a full performance check with state-of-the-art diagnostics, fluid inspections, wear-and-tear assessments, and a road test to ensure your car is ready for anything.</p>
        `,

    oil: `
        <h2>Oil Lube and Filter</h2>
        <p>Regular oil changes are the backbone of your car's health. At RockStar Auto Repair, we don't just change your oil — we provide a complete service designed to keep your vehicle running at its best.</p>
        <h5>Oil and Filter Replacement</h5>
        <p>We drain the old, used oil and replace it with fresh, high-quality oil, ensuring your engine runs smoothly. A high quality oil filter is used to maintain peak performance and keep contaminants at bay.</p>
        <h5>Lubrication of Fittings</h5>
        <p>Friction is the enemy of moving parts. We apply high-quality grease to all serviceable joints, reducing wear and extending the life of your vehicle.</p>
        <h5>Fluid Checks and Top-Offs</h5>
        <p>Beyond just oil, we inspect and top off all vital fluids, including coolant, power steering, and windshield washer fluids, to keep your car operating safely and efficiently.</p>
        `,

    engine: `
        <h2>Engine Service</h2>
        ${photoStrip('shop_floor', 'jeep_art')}
        <p>Your engine is the heart of your vehicle, and at RockStar Auto Repair, we treat it with the care and expertise it deserves. Whether it's a minor issue or routine maintenance, our team ensures your engine performs at its peak.</p>
        <h5>Visual Inspection of Engine Components</h5>
        <p>Our experienced technicians meticulously inspect your engine and its parts, identifying any irregularities that could lead to performance issues. With attention to detail, we make sure nothing is overlooked.</p>
        <h5>Air Filter Replacement</h5>
        <p>Clean air is essential for your engine's efficiency. Clogged air filters hinder performance and fuel economy, so we replace them regularly during oil changes or as recommended by your vehicle manufacturer.</p>
        <h5>Fuel Filter Replacement</h5>
        <p>Dirty or clogged fuel filters can cause poor gas mileage, difficulty starting, and a lack of power. Replacing them ensures clean fuel reaches your engine, helping it run smoothly and preventing costly repairs down the road.</p>
        <h5>Timing Belt Replacement</h5>
        <p>Timing belt maintenance is a critical part of a vehicle's dependability. At RockStar Auto Repair we can visually inspect most timing belts, preventing issues before they happen.</p>
        `,

    exhaust: `
        <h2>Exhaust Systems</h2>
        <p>A properly functioning exhaust system is essential for your vehicle's performance and environmental responsibility. At RockStar Auto Repair, we specialize in replacing damaged or worn-out exhaust systems to keep your car running clean and quiet.</p>
        <h5>Signs Your Exhaust System Needs Attention</h5>
        <ul>
            <li>Excessive noise — loud engine sounds or rumbling may indicate a problem with your muffler or exhaust pipes</li>
            <li>Decreased fuel efficiency — a damaged exhaust can disrupt your engine's airflow</li>
            <li>Unpleasant odors — smelling exhaust fumes inside your vehicle is a serious safety concern</li>
            <li>Visible rust or damage to exhaust pipes or muffler</li>
        </ul>
        <p>Our team expertly removes your old, damaged exhaust components and installs high-quality replacements tailored to your vehicle's specifications, ensuring your car meets safety and performance standards.</p>
        `,
};
