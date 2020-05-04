import React, { Component } from 'react';
import './sources.page.scss';
//
// const sorcs = [
//     {
//         title: <>Made Up Source</>,
//         summary: (
//             <>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida tristique quam, in hendrerit nulla ultricies id. Curabitur accumsan elit sit amet enim posuere efficitur. Sed eget feugiat erat. Ut id nunc interdum, interdum nibh in, feugiat purus. Maecenas sem velit, rutrum vitae placerat nec, vestibulum et diam. Cras orci nisi, convallis eu tincidunt sit amet, lobortis in orci. Mauris maximus lorem quis ligula iaculis, at rutrum massa pharetra. Etiam eget iaculis leo. Ut ultricies nulla vitae est feugiat semper. Donec vestibulum dignissim accumsan. Vestibulum accumsan eu libero quis finibus. Nulla vel neque quis odio blandit imperdiet. Aliquam sit amet enim rutrum, elementum orci in, ultricies felis.
//                 <br/>
//                 Aenean gravida erat vitae sem mollis, non tincidunt ante commodo. Nulla varius, magna vitae aliquam faucibus, arcu mauris finibus nulla, vel mollis lorem purus molestie ligula. Donec diam magna, semper sit amet commodo non, mollis in neque. Sed eget convallis erat. Maecenas quis nisl ornare, lobortis magna quis, dapibus arcu. Proin lacinia et libero in vehicula. Sed eget neque eu justo venenatis euismod nec non turpis. Nam pretium, arcu sed facilisis gravida, diam tellus blandit ligula, non viverra felis mi eget erat. Maecenas molestie, eros sit amet suscipit elementum, purus turpis dictum arcu, aliquet consectetur...
//             </>
//         ),
//         doclink: 'https://www.google.com',
//         date: <>1.1.20</>,
//     },
//     {
//         title: <>Another 1</>,
//         summary: (
//             <>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida tristique quam, in hendrerit nulla ultricies id. Curabitur accumsan elit sit amet enim posuere efficitur. Sed eget feugiat erat. Ut id nunc interdum, interdum nibh in, feugiat purus. Maecenas sem velit, rutrum vitae placerat nec, vestibulum et diam. Cras orci nisi, convallis eu tincidunt sit amet, lobortis in orci. Mauris maximus lorem quis ligula iaculis, at rutrum massa pharetra. Etiam eget iaculis leo. Ut ultricies nulla vitae est feugiat semper. Donec vestibulum dignissim accumsan. Vestibulum accumsan eu libero quis finibus. Nulla vel neque quis odio blandit imperdiet. Aliquam sit amet enim rutrum, elementum orci in, ultricies felis.
//                 <br/>
//                 Aenean gravida erat vitae sem mollis, non tincidunt ante commodo. Nulla varius, magna vitae aliquam faucibus, arcu mauris finibus nulla, vel mollis lorem purus molestie ligula. Donec diam magna, semper sit amet commodo non, mollis in neque. Sed eget convallis erat. Maecenas quis nisl ornare, lobortis magna quis, dapibus arcu. Proin lacinia et libero in vehicula. Sed eget neque eu justo venenatis euismod nec non turpis. Nam pretium, arcu sed facilisis gravida, diam tellus blandit ligula, non viverra felis mi eget erat. Maecenas molestie, eros sit amet suscipit elementum, purus turpis dictum arcu, aliquet consectetur...
//             </>
//         ),
//         doclink: 'https://www.google.com',
//         date: <>1.1.20</>,
//     },
// ];
//
// function Source({title, summary, doclink, date}) {
//     return (
//         <div className={classnames('col col--12', styles.source)}>
//             <h2 className={classnames("text--center", styles.featureTitle)}>{title} - {date}</h2>
//             <p className={classnames("text--center", styles.featureText)}>{summary}</p>
//             <p>Link to source: <a href={doclink}>{doclink}</a></p>
//         </div>
//     );
// }
//
// function Sources() {
//     return (
//         <>
//             <div className="headerBanner">
//                 <div className="container">
//                     <div className="headerCenter">
//                         <h1 className="headerTitle">Sources</h1>
//                     </div>
//                 </div>
//             </div>
//             <main>
//                 {sorcs && sorcs.length && (
//                     <section className={styles.features}>
//                         <div className="container">
//                             <div className="row">
//                                 {sorcs.map((props, idx) => (
//                                     <Source key={idx} {...props} />
//                                 ))}
//                             </div>
//                         </div>
//                     </section>
//                 )}
//             </main>
//         </>
//     );
// }
//
// export default Sources;
