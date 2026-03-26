/**
 * roadmapData.js
 *
 * Curated learning resources for every topic across all 10 roles.
 * Structure:  RESOURCES[topicName] = [ ...resourceObjects ]
 *
 * Each resource:  { title, url, type, estimatedHours }
 * type: "video" | "article" | "course" | "docs" | "practice"
 *
 * Topics match exactly the names defined in seed.js roles.
 */

const RESOURCES = {
  // ── Frontend Developer ───────────────────────────────────────────────────
  "HTML & Semantic Markup": [
    { title: "HTML Full Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=pQN-pnXPaVg", type: "video", estimatedHours: 4 },
    { title: "MDN – HTML Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics", type: "docs", estimatedHours: 2 },
    { title: "Semantic HTML Guide", url: "https://web.dev/learn/html/semantic-html/", type: "article", estimatedHours: 1 },
  ],
  "CSS & Flexbox/Grid": [
    { title: "CSS Flexbox – Kevin Powell", url: "https://www.youtube.com/watch?v=u044iM9xsWU", type: "video", estimatedHours: 2 },
    { title: "CSS Grid – Complete Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/", type: "article", estimatedHours: 2 },
    { title: "Flexbox Froggy (Practice)", url: "https://flexboxfroggy.com/", type: "practice", estimatedHours: 1 },
    { title: "Grid Garden (Practice)", url: "https://cssgridgarden.com/", type: "practice", estimatedHours: 1 },
  ],
  "JavaScript Fundamentals": [
    { title: "JavaScript Full Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=PkZNo7MFNFg", type: "video", estimatedHours: 8 },
    { title: "The Modern JavaScript Tutorial", url: "https://javascript.info/", type: "docs", estimatedHours: 10 },
    { title: "JavaScript30 – 30 Day Challenge", url: "https://javascript30.com/", type: "practice", estimatedHours: 10 },
  ],
  "React Basics": [
    { title: "React Official Tutorial", url: "https://react.dev/learn", type: "docs", estimatedHours: 4 },
    { title: "React Full Course – Traversy Media", url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8", type: "video", estimatedHours: 5 },
    { title: "Scrimba – Learn React", url: "https://scrimba.com/learn/learnreact", type: "course", estimatedHours: 6 },
  ],
  "React Hooks": [
    { title: "React Hooks Explained – Web Dev Simplified", url: "https://www.youtube.com/watch?v=O6P86uwfdR0", type: "video", estimatedHours: 2 },
    { title: "React Hooks Reference – Official Docs", url: "https://react.dev/reference/react", type: "docs", estimatedHours: 2 },
    { title: "useEffect Deep Dive", url: "https://overreacted.io/a-complete-guide-to-useeffect/", type: "article", estimatedHours: 1 },
  ],
  "State Management": [
    { title: "Redux Toolkit Official Guide", url: "https://redux-toolkit.js.org/introduction/getting-started", type: "docs", estimatedHours: 3 },
    { title: "Zustand – State Management", url: "https://docs.pmnd.rs/zustand/getting-started/introduction", type: "docs", estimatedHours: 2 },
    { title: "Redux Crash Course – Traversy Media", url: "https://www.youtube.com/watch?v=93p3LxR9xfM", type: "video", estimatedHours: 2 },
  ],
  "REST API Integration": [
    { title: "Axios Docs", url: "https://axios-http.com/docs/intro", type: "docs", estimatedHours: 1 },
    { title: "Fetch API Guide – MDN", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch", type: "docs", estimatedHours: 1 },
    { title: "React Query (TanStack)", url: "https://tanstack.com/query/latest", type: "docs", estimatedHours: 2 },
  ],
  "Performance Optimisation": [
    { title: "React Performance – Official Docs", url: "https://react.dev/learn/render-and-commit", type: "docs", estimatedHours: 2 },
    { title: "Web Vitals – web.dev", url: "https://web.dev/vitals/", type: "article", estimatedHours: 1 },
    { title: "Chrome DevTools Performance", url: "https://developer.chrome.com/docs/devtools/performance/", type: "docs", estimatedHours: 2 },
  ],
  "Accessibility (a11y)": [
    { title: "Web Accessibility – web.dev", url: "https://web.dev/learn/accessibility/", type: "course", estimatedHours: 4 },
    { title: "ARIA Authoring Practices", url: "https://www.w3.org/WAI/ARIA/apg/", type: "docs", estimatedHours: 2 },
  ],
  "Testing (Jest/RTL)": [
    { title: "Testing Library Docs", url: "https://testing-library.com/docs/react-testing-library/intro/", type: "docs", estimatedHours: 3 },
    { title: "Jest Official Docs", url: "https://jestjs.io/docs/getting-started", type: "docs", estimatedHours: 2 },
    { title: "React Testing Course – Kent C. Dodds", url: "https://www.youtube.com/watch?v=8Xwq35cPwYg", type: "video", estimatedHours: 3 },
  ],

  // ── Backend Developer ────────────────────────────────────────────────────
  "Node.js Fundamentals": [
    { title: "Node.js Crash Course – Traversy Media", url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4", type: "video", estimatedHours: 2 },
    { title: "Node.js Official Docs", url: "https://nodejs.org/en/docs/", type: "docs", estimatedHours: 3 },
    { title: "The Node.js Handbook", url: "https://flaviocopes.com/node/", type: "article", estimatedHours: 2 },
  ],
  "Express.js": [
    { title: "Express.js Official Guide", url: "https://expressjs.com/en/guide/routing.html", type: "docs", estimatedHours: 2 },
    { title: "Express Crash Course – Traversy Media", url: "https://www.youtube.com/watch?v=SccSCuHhOw0", type: "video", estimatedHours: 1 },
  ],
  "REST API Design": [
    { title: "REST API Design Best Practices", url: "https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/", type: "article", estimatedHours: 1 },
    { title: "HTTP Status Codes Reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status", type: "docs", estimatedHours: 1 },
    { title: "Swagger / OpenAPI Guide", url: "https://swagger.io/docs/specification/about/", type: "docs", estimatedHours: 2 },
  ],
  "Database Design (SQL)": [
    { title: "SQL Tutorial – W3Schools", url: "https://www.w3schools.com/sql/", type: "course", estimatedHours: 4 },
    { title: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/", type: "course", estimatedHours: 5 },
    { title: "Database Design Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=ztHopE5Wnpc", type: "video", estimatedHours: 8 },
  ],
  "MongoDB & Mongoose": [
    { title: "MongoDB University – Free Courses", url: "https://university.mongodb.com/", type: "course", estimatedHours: 5 },
    { title: "Mongoose Official Docs", url: "https://mongoosejs.com/docs/guide.html", type: "docs", estimatedHours: 2 },
    { title: "MongoDB Crash Course – Web Dev Simplified", url: "https://www.youtube.com/watch?v=ofme2o29ngU", type: "video", estimatedHours: 1 },
  ],
  "Authentication & JWT": [
    { title: "JWT Introduction – jwt.io", url: "https://jwt.io/introduction", type: "article", estimatedHours: 1 },
    { title: "Node Auth with JWT – Traversy Media", url: "https://www.youtube.com/watch?v=7nafaH9SddU", type: "video", estimatedHours: 2 },
    { title: "Passport.js Docs", url: "https://www.passportjs.org/docs/", type: "docs", estimatedHours: 2 },
  ],
  "Error Handling": [
    { title: "Express Error Handling – Official Docs", url: "https://expressjs.com/en/guide/error-handling.html", type: "docs", estimatedHours: 1 },
    { title: "Node.js Error Handling Best Practices", url: "https://www.joyent.com/node-js/production/design/errors", type: "article", estimatedHours: 1 },
  ],
  "Caching (Redis)": [
    { title: "Redis Official Docs", url: "https://redis.io/docs/", type: "docs", estimatedHours: 3 },
    { title: "Redis Crash Course – Traversy Media", url: "https://www.youtube.com/watch?v=jgpVdJB2sKQ", type: "video", estimatedHours: 1 },
    { title: "Caching Strategies Explained", url: "https://codeahoy.com/2017/08/11/caching-strategies-and-how-to-choose-the-right-one/", type: "article", estimatedHours: 1 },
  ],
  "Message Queues": [
    { title: "RabbitMQ Tutorials", url: "https://www.rabbitmq.com/getstarted.html", type: "docs", estimatedHours: 3 },
    { title: "Introduction to Message Queues", url: "https://www.youtube.com/watch?v=oUJbuFMyBDk", type: "video", estimatedHours: 1 },
  ],
  "Testing (Jest/Supertest)": [
    { title: "Jest Docs – Getting Started", url: "https://jestjs.io/docs/getting-started", type: "docs", estimatedHours: 2 },
    { title: "Supertest Docs", url: "https://github.com/ladjs/supertest#readme", type: "docs", estimatedHours: 1 },
    { title: "API Testing with Jest & Supertest", url: "https://www.youtube.com/watch?v=r5L1XRZaCR0", type: "video", estimatedHours: 1 },
  ],

  // ── MERN / Full Stack (shared topics) ────────────────────────────────────
  "React & State Management": [
    { title: "React + Redux Toolkit Full Tutorial", url: "https://www.youtube.com/watch?v=9zySeP5vH9c", type: "video", estimatedHours: 4 },
    { title: "Zustand Guide", url: "https://docs.pmnd.rs/zustand/getting-started/introduction", type: "docs", estimatedHours: 2 },
  ],
  "Node.js & Express": [
    { title: "MERN Stack Crash Course – Traversy Media", url: "https://www.youtube.com/watch?v=-0exw-9YJBo", type: "video", estimatedHours: 3 },
    { title: "Express Official Docs", url: "https://expressjs.com/", type: "docs", estimatedHours: 2 },
  ],
  "JWT Authentication": [
    { title: "JWT Auth in MERN – Dev Ed", url: "https://www.youtube.com/watch?v=7nafaH9SddU", type: "video", estimatedHours: 2 },
    { title: "JWT.io Debugger", url: "https://jwt.io/", type: "practice", estimatedHours: 1 },
  ],
  "File Uploads": [
    { title: "Multer Docs", url: "https://github.com/expressjs/multer#readme", type: "docs", estimatedHours: 1 },
    { title: "Cloudinary with Node.js", url: "https://cloudinary.com/documentation/node_integration", type: "docs", estimatedHours: 2 },
  ],
  "Deployment (Vercel/Render)": [
    { title: "Deploy React to Vercel", url: "https://vercel.com/docs/frameworks/react", type: "docs", estimatedHours: 1 },
    { title: "Deploy Node.js to Render", url: "https://render.com/docs/deploy-node-express-app", type: "docs", estimatedHours: 1 },
  ],
  "Socket.io (Real-time)": [
    { title: "Socket.io Official Docs", url: "https://socket.io/docs/v4/", type: "docs", estimatedHours: 3 },
    { title: "Real-time Chat App Tutorial", url: "https://www.youtube.com/watch?v=ZKEqqIO7n-k", type: "video", estimatedHours: 2 },
  ],
  "Environment Configuration": [
    { title: "dotenv Docs", url: "https://github.com/motdotla/dotenv#readme", type: "docs", estimatedHours: 1 },
    { title: "12-Factor App Config", url: "https://12factor.net/config", type: "article", estimatedHours: 1 },
  ],

  // ── Full Stack Developer ──────────────────────────────────────────────────
  "Frontend Frameworks": [
    { title: "React Docs", url: "https://react.dev/", type: "docs", estimatedHours: 4 },
    { title: "Vue.js Guide", url: "https://vuejs.org/guide/introduction.html", type: "docs", estimatedHours: 4 },
  ],
  "Backend Frameworks": [
    { title: "Express.js Docs", url: "https://expressjs.com/", type: "docs", estimatedHours: 2 },
    { title: "NestJS Documentation", url: "https://docs.nestjs.com/", type: "docs", estimatedHours: 4 },
  ],
  "Database Design": [
    { title: "Database Design Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=ztHopE5Wnpc", type: "video", estimatedHours: 8 },
    { title: "Data Modelling in MongoDB", url: "https://www.mongodb.com/docs/manual/core/data-modeling-introduction/", type: "docs", estimatedHours: 2 },
  ],
  "API Design (REST/GraphQL)": [
    { title: "GraphQL Official Docs", url: "https://graphql.org/learn/", type: "docs", estimatedHours: 3 },
    { title: "REST vs GraphQL Comparison", url: "https://www.apollographql.com/blog/graphql/basics/graphql-vs-rest/", type: "article", estimatedHours: 1 },
  ],
  "Authentication & Security": [
    { title: "OWASP Top 10 – Official Guide", url: "https://owasp.org/www-project-top-ten/", type: "docs", estimatedHours: 3 },
    { title: "Auth0 Identity Security Blog", url: "https://auth0.com/blog/", type: "article", estimatedHours: 2 },
  ],
  "CI/CD Pipelines": [
    { title: "GitHub Actions Docs", url: "https://docs.github.com/en/actions", type: "docs", estimatedHours: 3 },
    { title: "CI/CD Concepts – Atlassian", url: "https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment", type: "article", estimatedHours: 1 },
  ],
  "Cloud Basics": [
    { title: "AWS Cloud Practitioner Essentials – Free", url: "https://explore.skillbuilder.aws/learn/course/134/aws-cloud-practitioner-essentials", type: "course", estimatedHours: 6 },
    { title: "Google Cloud Fundamentals", url: "https://cloud.google.com/training/", type: "course", estimatedHours: 5 },
  ],
  "Containerisation (Docker)": [
    { title: "Docker Docs – Getting Started", url: "https://docs.docker.com/get-started/", type: "docs", estimatedHours: 3 },
    { title: "Docker Crash Course – TechWorld with Nana", url: "https://www.youtube.com/watch?v=3c-iBn73dDE", type: "video", estimatedHours: 3 },
  ],
  "System Design": [
    { title: "System Design Primer – GitHub", url: "https://github.com/donnemartin/system-design-primer", type: "article", estimatedHours: 10 },
    { title: "Grokking System Design – Educative", url: "https://www.educative.io/courses/grokking-the-system-design-interview", type: "course", estimatedHours: 15 },
  ],

  // ── AI/ML Engineer ───────────────────────────────────────────────────────
  "Python Fundamentals": [
    { title: "Python for Everybody – Coursera", url: "https://www.coursera.org/specializations/python", type: "course", estimatedHours: 8 },
    { title: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/", type: "docs", estimatedHours: 4 },
    { title: "Automate the Boring Stuff – Free Book", url: "https://automatetheboringstuff.com/", type: "article", estimatedHours: 6 },
  ],
  "NumPy & Pandas": [
    { title: "NumPy Official Quickstart", url: "https://numpy.org/doc/stable/user/quickstart.html", type: "docs", estimatedHours: 2 },
    { title: "Pandas Getting Started", url: "https://pandas.pydata.org/docs/getting_started/index.html", type: "docs", estimatedHours: 3 },
    { title: "Data Analysis with Pandas – freeCodeCamp", url: "https://www.youtube.com/watch?v=vmEHCJofslg", type: "video", estimatedHours: 4 },
  ],
  "Supervised Learning": [
    { title: "Supervised Learning – Andrew Ng (Coursera)", url: "https://www.coursera.org/learn/machine-learning", type: "course", estimatedHours: 20 },
    { title: "Scikit-learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html", type: "docs", estimatedHours: 4 },
  ],
  "Unsupervised Learning": [
    { title: "Unsupervised Learning – DeepLearning.AI", url: "https://www.coursera.org/learn/unsupervised-learning-recommenders-reinforcement-learning", type: "course", estimatedHours: 10 },
    { title: "Clustering Algorithms Explained", url: "https://www.youtube.com/watch?v=4b5d3muPQmA", type: "video", estimatedHours: 2 },
  ],
  "Deep Learning (Neural Nets)": [
    { title: "Deep Learning Specialization – Coursera", url: "https://www.coursera.org/specializations/deep-learning", type: "course", estimatedHours: 40 },
    { title: "Neural Networks from Scratch – 3Blue1Brown", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", type: "video", estimatedHours: 2 },
  ],
  "Model Evaluation & Tuning": [
    { title: "Model Evaluation – Scikit-learn", url: "https://scikit-learn.org/stable/modules/model_evaluation.html", type: "docs", estimatedHours: 3 },
    { title: "Hyperparameter Tuning Guide", url: "https://www.kaggle.com/learn/intro-to-ml", type: "course", estimatedHours: 3 },
  ],
  "Feature Engineering": [
    { title: "Feature Engineering for ML – Udemy", url: "https://www.kaggle.com/learn/feature-engineering", type: "course", estimatedHours: 4 },
  ],
  "Scikit-learn": [
    { title: "Scikit-learn Official Tutorials", url: "https://scikit-learn.org/stable/tutorial/index.html", type: "docs", estimatedHours: 4 },
  ],
  "TensorFlow / PyTorch": [
    { title: "TensorFlow Official Tutorials", url: "https://www.tensorflow.org/tutorials", type: "docs", estimatedHours: 5 },
    { title: "PyTorch Official Tutorials", url: "https://pytorch.org/tutorials/", type: "docs", estimatedHours: 5 },
  ],
  "MLOps & Deployment": [
    { title: "MLflow Docs", url: "https://mlflow.org/docs/latest/index.html", type: "docs", estimatedHours: 3 },
    { title: "Deploying ML Models with FastAPI", url: "https://www.youtube.com/watch?v=b5F667g1yCk", type: "video", estimatedHours: 2 },
  ],

  // ── Data Scientist ───────────────────────────────────────────────────────
  "Statistics & Probability": [
    { title: "Khan Academy – Statistics & Probability", url: "https://www.khanacademy.org/math/statistics-probability", type: "course", estimatedHours: 10 },
    { title: "Think Stats – Free Book", url: "https://greenteapress.com/thinkstats2/html/index.html", type: "article", estimatedHours: 5 },
  ],
  "Python & R": [
    { title: "R for Data Science – Free Book", url: "https://r4ds.had.co.nz/", type: "article", estimatedHours: 8 },
    { title: "Python Data Science Handbook – Free", url: "https://jakevdp.github.io/PythonDataScienceHandbook/", type: "article", estimatedHours: 8 },
  ],
  "Data Wrangling": [
    { title: "Pandas Data Wrangling Guide", url: "https://pandas.pydata.org/docs/user_guide/index.html", type: "docs", estimatedHours: 3 },
    { title: "Data Cleaning in Python – Kaggle", url: "https://www.kaggle.com/learn/data-cleaning", type: "course", estimatedHours: 3 },
  ],
  "Exploratory Data Analysis": [
    { title: "EDA with Pandas – Kaggle", url: "https://www.kaggle.com/learn/pandas", type: "course", estimatedHours: 4 },
    { title: "Exploratory Data Analysis – freeCodeCamp", url: "https://www.youtube.com/watch?v=-o3AxdVcUtQ", type: "video", estimatedHours: 2 },
  ],
  "Data Visualisation": [
    { title: "Matplotlib Tutorials", url: "https://matplotlib.org/stable/tutorials/index.html", type: "docs", estimatedHours: 2 },
    { title: "Seaborn Gallery & Docs", url: "https://seaborn.pydata.org/tutorial.html", type: "docs", estimatedHours: 2 },
    { title: "Data Visualisation – Kaggle", url: "https://www.kaggle.com/learn/data-visualization", type: "course", estimatedHours: 3 },
  ],
  "SQL & Databases": [
    { title: "SQL for Data Science – Coursera", url: "https://www.coursera.org/learn/sql-for-data-science", type: "course", estimatedHours: 8 },
    { title: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/", type: "course", estimatedHours: 4 },
  ],
  "Machine Learning Basics": [
    { title: "ML Crash Course – Google", url: "https://developers.google.com/machine-learning/crash-course", type: "course", estimatedHours: 15 },
  ],
  "A/B Testing": [
    { title: "A/B Testing – Udacity", url: "https://www.udacity.com/course/ab-testing--ud257", type: "course", estimatedHours: 8 },
    { title: "A/B Testing Guide – Optimizely", url: "https://www.optimizely.com/optimization-glossary/ab-testing/", type: "article", estimatedHours: 1 },
  ],
  "Big Data Tools (Spark)": [
    { title: "Apache Spark Official Docs", url: "https://spark.apache.org/docs/latest/", type: "docs", estimatedHours: 5 },
    { title: "PySpark Tutorial – freeCodeCamp", url: "https://www.youtube.com/watch?v=_C8kWso4ne4", type: "video", estimatedHours: 3 },
  ],
  "Storytelling with Data": [
    { title: "Storytelling with Data – Book by Cole Nussbaumer", url: "https://www.storytellingwithdata.com/", type: "article", estimatedHours: 4 },
    { title: "Data Storytelling – Tableau", url: "https://www.tableau.com/learn/articles/data-storytelling", type: "article", estimatedHours: 1 },
  ],

  // ── DevOps Engineer ───────────────────────────────────────────────────────
  "Linux & Shell Scripting": [
    { title: "Linux Command Line – The Odin Project", url: "https://www.theodinproject.com/lessons/foundations-command-line-basics", type: "course", estimatedHours: 4 },
    { title: "Linux Journey", url: "https://linuxjourney.com/", type: "course", estimatedHours: 5 },
    { title: "Bash Scripting Tutorial", url: "https://ryanstutorials.net/bash-scripting-tutorial/", type: "article", estimatedHours: 3 },
  ],
  "Git & Version Control": [
    { title: "Pro Git – Free Book", url: "https://git-scm.com/book/en/v2", type: "article", estimatedHours: 5 },
    { title: "Learn Git Branching (Interactive)", url: "https://learngitbranching.js.org/", type: "practice", estimatedHours: 2 },
  ],
  "Docker & Containers": [
    { title: "Docker Docs – Getting Started", url: "https://docs.docker.com/get-started/", type: "docs", estimatedHours: 3 },
    { title: "Docker for Beginners – TechWorld with Nana", url: "https://www.youtube.com/watch?v=3c-iBn73dDE", type: "video", estimatedHours: 3 },
    { title: "Play with Docker (Practice)", url: "https://labs.play-with-docker.com/", type: "practice", estimatedHours: 2 },
  ],
  "Kubernetes": [
    { title: "Kubernetes Official Tutorial", url: "https://kubernetes.io/docs/tutorials/", type: "docs", estimatedHours: 5 },
    { title: "Kubernetes Course – TechWorld with Nana", url: "https://www.youtube.com/watch?v=X48VuDVv0do", type: "video", estimatedHours: 4 },
    { title: "Killercoda K8s Labs (Practice)", url: "https://killercoda.com/kubernetes", type: "practice", estimatedHours: 3 },
  ],
  "CI/CD (GitHub Actions / Jenkins)": [
    { title: "GitHub Actions Official Docs", url: "https://docs.github.com/en/actions", type: "docs", estimatedHours: 3 },
    { title: "Jenkins Getting Started", url: "https://www.jenkins.io/doc/pipeline/tour/getting-started/", type: "docs", estimatedHours: 2 },
  ],
  "Infrastructure as Code (Terraform)": [
    { title: "Terraform Official Tutorials", url: "https://developer.hashicorp.com/terraform/tutorials", type: "docs", estimatedHours: 4 },
    { title: "Terraform Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=SLB_c_ayRMo", type: "video", estimatedHours: 3 },
  ],
  "Monitoring & Logging": [
    { title: "Prometheus Docs", url: "https://prometheus.io/docs/introduction/overview/", type: "docs", estimatedHours: 2 },
    { title: "Grafana Getting Started", url: "https://grafana.com/docs/grafana/latest/getting-started/", type: "docs", estimatedHours: 2 },
    { title: "ELK Stack Tutorial", url: "https://www.youtube.com/watch?v=4X0WLg05ASw", type: "video", estimatedHours: 2 },
  ],
  "Cloud Platforms (AWS/GCP/Azure)": [
    { title: "AWS Free Tier + Skills Builder", url: "https://aws.amazon.com/free/", type: "practice", estimatedHours: 5 },
    { title: "Google Cloud Skills Boost", url: "https://cloudskillsboost.google/", type: "course", estimatedHours: 8 },
  ],
  "Networking Basics": [
    { title: "Computer Networking – Stanford (free)", url: "https://www.youtube.com/playlist?list=PLvFG2xYBrYAQCyz4Wx3NPoYJOFjvU7g2Z", type: "video", estimatedHours: 5 },
    { title: "Networking Fundamentals – Professor Messer", url: "https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/", type: "video", estimatedHours: 8 },
  ],
  "Security & Compliance": [
    { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", type: "docs", estimatedHours: 3 },
    { title: "DevSecOps Guide – SANS", url: "https://www.sans.org/blog/what-is-devsecops/", type: "article", estimatedHours: 1 },
  ],

  // ── Cloud Engineer ────────────────────────────────────────────────────────
  "AWS Core Services": [
    { title: "AWS Cloud Practitioner Essentials", url: "https://explore.skillbuilder.aws/learn/course/134/aws-cloud-practitioner-essentials", type: "course", estimatedHours: 6 },
    { title: "AWS Solutions Architect Associate – freeCodeCamp", url: "https://www.youtube.com/watch?v=Ia-UEYYR44s", type: "video", estimatedHours: 10 },
  ],
  "Azure Fundamentals": [
    { title: "AZ-900 Study Guide – Microsoft Learn", url: "https://learn.microsoft.com/en-us/certifications/exams/az-900", type: "course", estimatedHours: 8 },
    { title: "Azure Fundamentals – John Savill", url: "https://www.youtube.com/watch?v=pY0LnKiDwRA", type: "video", estimatedHours: 4 },
  ],
  "GCP Basics": [
    { title: "Google Cloud Skills Boost", url: "https://cloudskillsboost.google/", type: "course", estimatedHours: 6 },
  ],
  "Cloud Networking (VPC)": [
    { title: "AWS VPC Guide", url: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html", type: "docs", estimatedHours: 2 },
    { title: "VPC Deep Dive – Adrian Cantrill", url: "https://www.youtube.com/watch?v=bGDMeD6kOz0", type: "video", estimatedHours: 2 },
  ],
  "IAM & Security": [
    { title: "AWS IAM Docs", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html", type: "docs", estimatedHours: 2 },
    { title: "Cloud Security Best Practices – CISA", url: "https://www.cisa.gov/resources-tools/resources/cloud-security-technical-reference-architecture", type: "docs", estimatedHours: 2 },
  ],
  "Serverless Architecture": [
    { title: "AWS Lambda Docs", url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html", type: "docs", estimatedHours: 2 },
    { title: "Serverless Framework Docs", url: "https://www.serverless.com/framework/docs", type: "docs", estimatedHours: 2 },
  ],
  "Storage & Databases in Cloud": [
    { title: "AWS S3 Docs", url: "https://docs.aws.amazon.com/s3/", type: "docs", estimatedHours: 2 },
    { title: "Cloud Databases Comparison", url: "https://cloud.google.com/blog/topics/developers-practitioners/databases-google-cloud-explained", type: "article", estimatedHours: 1 },
  ],
  "Cost Optimisation": [
    { title: "AWS Cost Optimisation Hub", url: "https://docs.aws.amazon.com/cost-management/latest/userguide/what-is-costmanagement.html", type: "docs", estimatedHours: 2 },
    { title: "FinOps Foundation", url: "https://www.finops.org/introduction/what-is-finops/", type: "article", estimatedHours: 1 },
  ],
  "Terraform / CloudFormation": [
    { title: "Terraform Official Tutorials", url: "https://developer.hashicorp.com/terraform/tutorials", type: "docs", estimatedHours: 4 },
    { title: "AWS CloudFormation Docs", url: "https://docs.aws.amazon.com/cloudformation/", type: "docs", estimatedHours: 2 },
  ],
  "Cloud Migration": [
    { title: "AWS Migration Hub", url: "https://aws.amazon.com/migration-hub/", type: "docs", estimatedHours: 3 },
    { title: "6 Rs of Cloud Migration", url: "https://aws.amazon.com/blogs/enterprise-strategy/6-strategies-for-migrating-applications-to-the-cloud/", type: "article", estimatedHours: 1 },
  ],

  // ── Cybersecurity Analyst ─────────────────────────────────────────────────
  "Networking Fundamentals": [
    { title: "CompTIA Network+ Professor Messer", url: "https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/", type: "video", estimatedHours: 8 },
    { title: "Cisco Networking Basics", url: "https://skillsforall.com/course/networking-basics", type: "course", estimatedHours: 6 },
  ],
  "OS Security (Linux/Windows)": [
    { title: "Linux Security – SANS", url: "https://www.sans.org/blog/linux-security-best-practices/", type: "article", estimatedHours: 2 },
    { title: "Windows Security Fundamentals – Microsoft", url: "https://learn.microsoft.com/en-us/windows/security/", type: "docs", estimatedHours: 3 },
  ],
  "OWASP Top 10": [
    { title: "OWASP Top 10 Official", url: "https://owasp.org/www-project-top-ten/", type: "docs", estimatedHours: 3 },
    { title: "Web Security Academy – PortSwigger (Free)", url: "https://portswigger.net/web-security", type: "practice", estimatedHours: 20 },
  ],
  "Cryptography Basics": [
    { title: "Cryptography – Khan Academy", url: "https://www.khanacademy.org/computing/computer-science/cryptography", type: "course", estimatedHours: 4 },
    { title: "Applied Cryptography – Coursera", url: "https://www.coursera.org/learn/crypto", type: "course", estimatedHours: 20 },
  ],
  "Vulnerability Assessment": [
    { title: "Nmap Docs", url: "https://nmap.org/book/man.html", type: "docs", estimatedHours: 2 },
    { title: "Vulnerability Assessment – TryHackMe", url: "https://tryhackme.com/room/vulnerabilities101", type: "practice", estimatedHours: 3 },
  ],
  "Incident Response": [
    { title: "NIST Incident Handling Guide", url: "https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-61r2.pdf", type: "docs", estimatedHours: 3 },
    { title: "Incident Response Course – SANS", url: "https://www.sans.org/courses/incident-handlers-handbook/", type: "course", estimatedHours: 5 },
  ],
  "SIEM & Log Analysis": [
    { title: "Splunk Free Training", url: "https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html", type: "course", estimatedHours: 4 },
    { title: "ELK SIEM Guide", url: "https://www.elastic.co/guide/en/security/current/index.html", type: "docs", estimatedHours: 3 },
  ],
  "Ethical Hacking Basics": [
    { title: "TryHackMe – Learning Paths", url: "https://tryhackme.com/paths", type: "practice", estimatedHours: 20 },
    { title: "Ethical Hacking – TCM Security (YouTube)", url: "https://www.youtube.com/c/TCMSecurityAcademy", type: "video", estimatedHours: 10 },
  ],
  "Compliance (ISO 27001, GDPR)": [
    { title: "ISO 27001 Overview – IT Governance", url: "https://www.itgovernance.co.uk/iso27001", type: "article", estimatedHours: 2 },
    { title: "GDPR Official Text", url: "https://gdpr-info.eu/", type: "docs", estimatedHours: 2 },
  ],
  "Cloud Security": [
    { title: "AWS Security Best Practices", url: "https://aws.amazon.com/security/security-resources/", type: "docs", estimatedHours: 3 },
    { title: "CCSP Certification Guide", url: "https://www.isc2.org/Certifications/CCSP", type: "article", estimatedHours: 2 },
  ],

  // ── Mobile App Developer ──────────────────────────────────────────────────
  "React Native Basics": [
    { title: "React Native Official Docs", url: "https://reactnative.dev/docs/getting-started", type: "docs", estimatedHours: 4 },
    { title: "React Native Crash Course – Traversy Media", url: "https://www.youtube.com/watch?v=Hf4MJH0jDb4", type: "video", estimatedHours: 2 },
    { title: "Expo Getting Started", url: "https://docs.expo.dev/get-started/introduction/", type: "docs", estimatedHours: 2 },
  ],
  "Navigation (React Navigation)": [
    { title: "React Navigation Docs", url: "https://reactnavigation.org/docs/getting-started", type: "docs", estimatedHours: 2 },
    { title: "React Navigation Tutorial", url: "https://www.youtube.com/watch?v=nQVCkqvU1uE", type: "video", estimatedHours: 2 },
  ],
  "State Management (Redux)": [
    { title: "Redux Toolkit Docs", url: "https://redux-toolkit.js.org/", type: "docs", estimatedHours: 3 },
    { title: "Redux in React Native", url: "https://www.youtube.com/watch?v=9boMnm5X9ak", type: "video", estimatedHours: 2 },
  ],
  "Native APIs (Camera, GPS)": [
    { title: "Expo Camera Docs", url: "https://docs.expo.dev/versions/latest/sdk/camera/", type: "docs", estimatedHours: 1 },
    { title: "Expo Location Docs", url: "https://docs.expo.dev/versions/latest/sdk/location/", type: "docs", estimatedHours: 1 },
  ],
  "UI Components & Styling": [
    { title: "React Native StyleSheet Docs", url: "https://reactnative.dev/docs/stylesheet", type: "docs", estimatedHours: 1 },
    { title: "NativeWind (Tailwind for RN)", url: "https://www.nativewind.dev/", type: "docs", estimatedHours: 1 },
  ],
  "App Store Deployment": [
    { title: "Expo EAS Build Docs", url: "https://docs.expo.dev/build/introduction/", type: "docs", estimatedHours: 2 },
    { title: "Submit to App Store – Apple Guide", url: "https://developer.apple.com/ios/submit/", type: "docs", estimatedHours: 2 },
  ],
  "Push Notifications": [
    { title: "Expo Notifications Docs", url: "https://docs.expo.dev/push-notifications/overview/", type: "docs", estimatedHours: 1 },
    { title: "Firebase Cloud Messaging Guide", url: "https://firebase.google.com/docs/cloud-messaging", type: "docs", estimatedHours: 2 },
  ],
  "Offline Storage (AsyncStorage)": [
    { title: "AsyncStorage Docs", url: "https://react-native-async-storage.github.io/async-storage/docs/usage/", type: "docs", estimatedHours: 1 },
    { title: "WatermelonDB for RN", url: "https://nozbe.github.io/WatermelonDB/", type: "docs", estimatedHours: 2 },
  ],
  "Performance & Optimisation": [
    { title: "React Native Performance Docs", url: "https://reactnative.dev/docs/performance", type: "docs", estimatedHours: 2 },
    { title: "Optimising React Native Apps", url: "https://www.youtube.com/watch?v=fnkKPpJHgQk", type: "video", estimatedHours: 1 },
  ],
  "Testing (Detox / Jest)": [
    { title: "Detox E2E Testing Docs", url: "https://wix.github.io/Detox/docs/introduction/getting-started", type: "docs", estimatedHours: 2 },
    { title: "Jest for React Native", url: "https://jestjs.io/docs/tutorial-react-native", type: "docs", estimatedHours: 2 },
  ],

  // ── UI/UX Designer ────────────────────────────────────────────────────────
  "Wireframing & Prototyping": [
    { title: "Figma Wireframing Tutorial – Google", url: "https://www.youtube.com/watch?v=D4NyQ5ZsLs8", type: "video", estimatedHours: 2 },
    { title: "Wireframing Guide – NNG", url: "https://www.nngroup.com/articles/wireframing-101/", type: "article", estimatedHours: 1 },
    { title: "Prototyping in Figma – Official Docs", url: "https://help.figma.com/hc/en-us/categories/360002051613-Prototyping", type: "docs", estimatedHours: 2 },
  ],
  "User Research": [
    { title: "User Research Methods – NNG", url: "https://www.nngroup.com/articles/which-ux-research-methods/", type: "article", estimatedHours: 2 },
    { title: "UX Research Crash Course – Google", url: "https://www.youtube.com/watch?v=lViHHC5DgMc", type: "video", estimatedHours: 3 },
    { title: "Just Enough Research – Free Sample", url: "https://abookapart.com/products/just-enough-research", type: "article", estimatedHours: 2 },
  ],
  "Figma & Design Tools": [
    { title: "Figma for Beginners – Official Course", url: "https://www.figma.com/resources/learn-design/", type: "course", estimatedHours: 4 },
    { title: "Figma Tutorial – DesignCourse", url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8", type: "video", estimatedHours: 2 },
    { title: "Figma Community – Free Designs", url: "https://www.figma.com/community", type: "practice", estimatedHours: 2 },
  ],
  "Design Systems": [
    { title: "Design Systems Handbook – Free", url: "https://www.designbetter.co/design-systems-handbook", type: "article", estimatedHours: 3 },
    { title: "Material Design System – Google", url: "https://m3.material.io/", type: "docs", estimatedHours: 2 },
    { title: "Building a Design System in Figma", url: "https://www.youtube.com/watch?v=EK-pHkc5EL4", type: "video", estimatedHours: 2 },
  ],
  "Information Architecture": [
    { title: "Information Architecture – Web Style Guide", url: "https://webstyleguide.com/wsg3/3-information-architecture/", type: "article", estimatedHours: 2 },
    { title: "Card Sorting – NNG", url: "https://www.nngroup.com/articles/card-sorting-definition/", type: "article", estimatedHours: 1 },
  ],
  "Usability Testing": [
    { title: "Usability Testing 101 – NNG", url: "https://www.nngroup.com/articles/usability-testing-101/", type: "article", estimatedHours: 2 },
    { title: "How to Run a Usability Test – YouTube", url: "https://www.youtube.com/watch?v=nYCJTea1AUQ", type: "video", estimatedHours: 1 },
  ],
  "Gestalt Principles": [
    { title: "Gestalt Principles in Design – Smashing Magazine", url: "https://www.smashingmagazine.com/2014/03/design-principles-visual-perception-and-the-principles-of-gestalt/", type: "article", estimatedHours: 2 },
    { title: "Gestalt Principles – UX Collective", url: "https://uxdesign.cc/gestalt-principles-in-ui-design-8b245d11c4e8", type: "article", estimatedHours: 1 },
  ],
  "Typography & Color Theory": [
    { title: "Typography Basics – Canva Design School", url: "https://www.canva.com/learn/font-design/", type: "article", estimatedHours: 2 },
    { title: "Color Theory Crash Course – NNG", url: "https://www.nngroup.com/articles/effective-use-of-color/", type: "article", estimatedHours: 1 },
    { title: "Google Fonts Knowledge", url: "https://fonts.google.com/knowledge", type: "docs", estimatedHours: 2 },
  ],
  "Interaction Design": [
    { title: "Interaction Design Foundation – Free Articles", url: "https://www.interaction-design.org/literature", type: "article", estimatedHours: 3 },
    { title: "Laws of UX", url: "https://lawsofux.com/", type: "article", estimatedHours: 2 },
    { title: "Micro-Interactions in UI – UX Planet", url: "https://uxplanet.org/microinteractions-the-secret-of-great-app-design-4cfe70fbaccf", type: "article", estimatedHours: 1 },
  ],

  // ── Blockchain Developer ──────────────────────────────────────────────────
  "Blockchain Fundamentals": [
    { title: "Blockchain Explained – 3Blue1Brown", url: "https://www.youtube.com/watch?v=bBC-nXj3Ng4", type: "video", estimatedHours: 1 },
    { title: "Blockchain Basics – Coursera", url: "https://www.coursera.org/learn/blockchain-basics", type: "course", estimatedHours: 10 },
    { title: "Bitcoin White Paper", url: "https://bitcoin.org/bitcoin.pdf", type: "article", estimatedHours: 2 },
  ],
  "Smart Contracts (Solidity)": [
    { title: "CryptoZombies – Learn Solidity (Interactive)", url: "https://cryptozombies.io/", type: "practice", estimatedHours: 6 },
    { title: "Solidity Official Docs", url: "https://docs.soliditylang.org/en/latest/", type: "docs", estimatedHours: 5 },
    { title: "Smart Contracts Full Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=M576WGiDBdQ", type: "video", estimatedHours: 6 },
  ],
  "Ethereum & EVM": [
    { title: "Ethereum Official Docs", url: "https://ethereum.org/en/developers/docs/", type: "docs", estimatedHours: 5 },
    { title: "How Ethereum Works – Illustration", url: "https://www.preethikasireddy.com/post/how-does-ethereum-work-anyway", type: "article", estimatedHours: 2 },
  ],
  "DeFi Concepts": [
    { title: "DeFi Explained – Finematics (YouTube)", url: "https://www.youtube.com/c/Finematics", type: "video", estimatedHours: 4 },
    { title: "DeFi Pulse Docs", url: "https://defipulse.com/", type: "article", estimatedHours: 1 },
  ],
  "NFT Standards (ERC-721)": [
    { title: "ERC-721 Standard – OpenZeppelin", url: "https://docs.openzeppelin.com/contracts/4.x/erc721", type: "docs", estimatedHours: 2 },
    { title: "Build an NFT – freeCodeCamp", url: "https://www.youtube.com/watch?v=9oERTH9Bkw0", type: "video", estimatedHours: 2 },
  ],
  "Web3.js / Ethers.js": [
    { title: "Ethers.js Official Docs", url: "https://docs.ethers.org/v6/", type: "docs", estimatedHours: 3 },
    { title: "Web3.js Official Docs", url: "https://web3js.readthedocs.io/", type: "docs", estimatedHours: 3 },
    { title: "Ethers.js Crash Course", url: "https://www.youtube.com/watch?v=yk7nVp5HTCk", type: "video", estimatedHours: 2 },
  ],
  "Consensus Mechanisms": [
    { title: "Proof of Work vs Proof of Stake – Finematics", url: "https://www.youtube.com/watch?v=M3EFi_POhps", type: "video", estimatedHours: 1 },
    { title: "Ethereum Proof of Stake – Official", url: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/", type: "docs", estimatedHours: 2 },
  ],
  "Cryptographic Hashing": [
    { title: "Cryptographic Hash Functions – Khan Academy", url: "https://www.khanacademy.org/economics-finance-domain/core-finance/money-and-banking/bitcoin/v/bitcoin-cryptographic-hash-function", type: "video", estimatedHours: 1 },
    { title: "SHA-256 Explained", url: "https://www.youtube.com/watch?v=DMtFhACPnTY", type: "video", estimatedHours: 1 },
  ],
  "IPFS & Decentralized Storage": [
    { title: "IPFS Official Docs", url: "https://docs.ipfs.tech/", type: "docs", estimatedHours: 2 },
    { title: "IPFS & Filecoin Explained", url: "https://www.youtube.com/watch?v=5Uj6uR3fp-U", type: "video", estimatedHours: 1 },
  ],
  "Gas Optimization": [
    { title: "Gas Optimization in Solidity – OpenZeppelin Blog", url: "https://blog.openzeppelin.com/gas-optimization-guide", type: "article", estimatedHours: 2 },
    { title: "Solidity Gas Optimization Tricks", url: "https://www.youtube.com/watch?v=IkdoQI7API0", type: "video", estimatedHours: 1 },
  ],

  // ── Game Developer ────────────────────────────────────────────────────────
  "Game Loop & Architecture": [
    { title: "Game Programming Patterns – Free Book", url: "https://gameprogrammingpatterns.com/", type: "article", estimatedHours: 6 },
    { title: "Game Loop Explained", url: "https://www.youtube.com/watch?v=qc9-7nFf6uM", type: "video", estimatedHours: 1 },
  ],
  "Unity / Unreal Engine": [
    { title: "Unity Learn – Official Platform", url: "https://learn.unity.com/", type: "course", estimatedHours: 10 },
    { title: "Unreal Engine Beginner Course – Udemy", url: "https://www.youtube.com/watch?v=SBlRisMFBXc", type: "video", estimatedHours: 5 },
    { title: "Unity in 6 Hours – Brackeys", url: "https://www.youtube.com/watch?v=IlKaB1etrik", type: "video", estimatedHours: 6 },
  ],
  "Physics Engine": [
    { title: "Unity Physics – Official Manual", url: "https://docs.unity3d.com/Manual/PhysicsSection.html", type: "docs", estimatedHours: 2 },
    { title: "2D Physics in Godot", url: "https://docs.godotengine.org/en/stable/tutorials/physics/", type: "docs", estimatedHours: 2 },
  ],
  "2D/3D Graphics (Sprites, Meshes)": [
    { title: "Unity 2D Spritesheet Tutorial", url: "https://www.youtube.com/watch?v=hM_hzNnzOtA", type: "video", estimatedHours: 2 },
    { title: "Blender for Game Dev – Grant Abbitt", url: "https://www.youtube.com/watch?v=ICBP-7x7Chc", type: "video", estimatedHours: 4 },
  ],
  "Shaders & VFX": [
    { title: "Shader Graph in Unity – Official", url: "https://docs.unity3d.com/Packages/com.unity.shadergraph@latest", type: "docs", estimatedHours: 3 },
    { title: "Introduction to Shaders – Freya Holmér", url: "https://www.youtube.com/watch?v=kfM-yu0iADk", type: "video", estimatedHours: 2 },
  ],
  "Game AI & Pathfinding": [
    { title: "A* Pathfinding Explained – Sebastian Lague", url: "https://www.youtube.com/watch?v=-L-WgKMFuhE", type: "video", estimatedHours: 2 },
    { title: "Unity NavMesh – Official Docs", url: "https://docs.unity3d.com/Manual/nav-NavigationSystem.html", type: "docs", estimatedHours: 2 },
  ],
  "Multiplayer & Networking": [
    { title: "Unity Netcode – Official Tutorial", url: "https://docs-multiplayer.unity3d.com/netcode/current/about/", type: "docs", estimatedHours: 4 },
    { title: "Multiplayer Game Programming – Guide", url: "https://gafferongames.com/", type: "article", estimatedHours: 4 },
  ],
  "Audio Systems": [
    { title: "Unity Audio – Official Docs", url: "https://docs.unity3d.com/Manual/AudioOverview.html", type: "docs", estimatedHours: 1 },
    { title: "FMOD Basics for Games", url: "https://www.fmod.com/learn", type: "course", estimatedHours: 2 },
  ],
  "Optimization (LOD, Culling)": [
    { title: "Unity Mobile Performance Guide", url: "https://docs.unity3d.com/Manual/MobileOptimizationPracticalGuide.html", type: "docs", estimatedHours: 2 },
    { title: "LOD in Unity – Official Manual", url: "https://docs.unity3d.com/Manual/LevelOfDetail.html", type: "docs", estimatedHours: 1 },
  ],
  "Game Design Patterns (ECS)": [
    { title: "Entity Component System in Unity", url: "https://learn.unity.com/tutorial/entity-component-system", type: "course", estimatedHours: 3 },
    { title: "Game Design Patterns – Robert Nystrom (Free)", url: "https://gameprogrammingpatterns.com/contents.html", type: "article", estimatedHours: 5 },
  ],

  // ── QA / Test Engineer ────────────────────────────────────────────────────
  "Test Case Design": [
    { title: "Test Case Design Techniques – Guru99", url: "https://www.guru99.com/test-case.html", type: "article", estimatedHours: 2 },
    { title: "ISTQB Foundation Course – YouTube", url: "https://www.youtube.com/watch?v=n7Oqy2JCm0Q", type: "video", estimatedHours: 4 },
  ],
  "Manual Testing": [
    { title: "Manual Testing Tutorial – Software Testing Help", url: "https://www.softwaretestinghelp.com/manual-testing-tutorial/", type: "article", estimatedHours: 3 },
    { title: "Manual vs Automated Testing", url: "https://www.youtube.com/watch?v=oLc9gVM8FBM", type: "video", estimatedHours: 1 },
  ],
  "Test Automation (Selenium/Cypress)": [
    { title: "Cypress Official Docs", url: "https://docs.cypress.io/guides/overview/why-cypress", type: "docs", estimatedHours: 4 },
    { title: "Selenium WebDriver Tutorial – BrowserStack", url: "https://www.browserstack.com/guide/selenium-webdriver-tutorial", type: "article", estimatedHours: 3 },
    { title: "Cypress Full Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=7N63cMKosIE", type: "video", estimatedHours: 3 },
  ],
  "API Testing (Postman)": [
    { title: "Postman Learning Center", url: "https://learning.postman.com/", type: "course", estimatedHours: 4 },
    { title: "API Testing Tutorial – Guru99", url: "https://www.guru99.com/api-testing.html", type: "article", estimatedHours: 2 },
  ],
  "Unit & Integration Testing": [
    { title: "Jest Docs – Getting Started", url: "https://jestjs.io/docs/getting-started", type: "docs", estimatedHours: 2 },
    { title: "Unit Testing Best Practices – Martin Fowler", url: "https://martinfowler.com/bliki/UnitTest.html", type: "article", estimatedHours: 1 },
  ],
  "Performance Testing (JMeter)": [
    { title: "Apache JMeter User Manual", url: "https://jmeter.apache.org/usermanual/index.html", type: "docs", estimatedHours: 3 },
    { title: "JMeter Tutorial for Beginners", url: "https://www.youtube.com/watch?v=8loLHbhfyh0", type: "video", estimatedHours: 2 },
  ],
  "Bug Reporting & Tracking": [
    { title: "How to Write a Good Bug Report – Atlassian", url: "https://www.atlassian.com/software/jira/guides/getting-started/agile-resources/bug-report-template", type: "article", estimatedHours: 1 },
    { title: "Jira for QA Teams – Official", url: "https://www.atlassian.com/software/jira/guides/", type: "docs", estimatedHours: 2 },
  ],
  "CI/CD for Testing": [
    { title: "GitHub Actions for Testing", url: "https://docs.github.com/en/actions/automating-builds-and-tests/about-continuous-integration", type: "docs", estimatedHours: 2 },
    { title: "CI/CD Pipeline for QA – YouTube", url: "https://www.youtube.com/watch?v=fl4aZ3tkuQs", type: "video", estimatedHours: 2 },
  ],
  "Test-Driven Development (TDD)": [
    { title: "TDD Guide – Martin Fowler", url: "https://martinfowler.com/bliki/TestDrivenDevelopment.html", type: "article", estimatedHours: 1 },
    { title: "TDD in JavaScript – YouTube", url: "https://www.youtube.com/watch?v=Jv2uxzhPFl4", type: "video", estimatedHours: 2 },
    { title: "Clean Code & TDD – Robert C. Martin Talks", url: "https://www.youtube.com/watch?v=T8J0j2opwSk", type: "video", estimatedHours: 2 },
  ],
  "Security Testing Basics": [
    { title: "OWASP Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/", type: "docs", estimatedHours: 3 },
    { title: "Web Security Testing – PortSwigger Academy", url: "https://portswigger.net/web-security", type: "practice", estimatedHours: 5 },
  ],

  // ── Database Administrator ────────────────────────────────────────────────
  "SQL & Relational Databases": [
    { title: "SQL Tutorial – Mode Analytics", url: "https://mode.com/sql-tutorial/", type: "course", estimatedHours: 4 },
    { title: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/", type: "course", estimatedHours: 5 },
    { title: "SQL Full Course – freeCodeCamp", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY", type: "video", estimatedHours: 4 },
  ],
  "Database Normalization": [
    { title: "Database Normalization Explained – Decomplexify", url: "https://www.youtube.com/watch?v=GFQaEYEc8_8", type: "video", estimatedHours: 1 },
    { title: "1NF, 2NF, 3NF, BCNF Tutorial – Studytonight", url: "https://www.studytonight.com/dbms/database-normalization.php", type: "article", estimatedHours: 2 },
  ],
  "Indexing & Query Optimization": [
    { title: "SQL Indexing and Tuning – Use the Index, Luke", url: "https://use-the-index-luke.com/", type: "article", estimatedHours: 4 },
    { title: "EXPLAIN in PostgreSQL", url: "https://www.postgresql.org/docs/current/using-explain.html", type: "docs", estimatedHours: 1 },
  ],
  "ACID Properties": [
    { title: "ACID Transactions Explained – Fauna", url: "https://fauna.com/blog/database-acid-transactions", type: "article", estimatedHours: 1 },
    { title: "Transactions in PostgreSQL", url: "https://www.postgresql.org/docs/current/tutorial-transactions.html", type: "docs", estimatedHours: 1 },
  ],
  "Stored Procedures & Triggers": [
    { title: "PostgreSQL Stored Procedures – Official", url: "https://www.postgresql.org/docs/current/plpgsql.html", type: "docs", estimatedHours: 2 },
    { title: "SQL Triggers Tutorial", url: "https://www.youtube.com/watch?v=jOOqkGEpULI", type: "video", estimatedHours: 1 },
  ],
  "Database Backup & Recovery": [
    { title: "pg_dump & pg_restore – Official Docs", url: "https://www.postgresql.org/docs/current/backup.html", type: "docs", estimatedHours: 2 },
    { title: "MySQL Backup Strategies", url: "https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html", type: "docs", estimatedHours: 1 },
  ],
  "Replication & Sharding": [
    { title: "PostgreSQL Replication – Docs", url: "https://www.postgresql.org/docs/current/high-availability.html", type: "docs", estimatedHours: 2 },
    { title: "Database Sharding Explained", url: "https://www.youtube.com/watch?v=5faMjKuB9bc", type: "video", estimatedHours: 1 },
  ],
  "NoSQL Databases": [
    { title: "MongoDB University – Free Courses", url: "https://university.mongodb.com/", type: "course", estimatedHours: 5 },
    { title: "Redis Official Docs", url: "https://redis.io/docs/", type: "docs", estimatedHours: 2 },
    { title: "NoSQL vs SQL – IBM", url: "https://www.ibm.com/cloud/blog/sql-vs-nosql", type: "article", estimatedHours: 1 },
  ],
  "Database Security": [
    { title: "Database Security Best Practices – CIS", url: "https://www.cisecurity.org/insights/white-papers/database-security-best-practices", type: "article", estimatedHours: 2 },
    { title: "SQL Injection Prevention – OWASP", url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html", type: "docs", estimatedHours: 1 },
  ],
  "Cloud Databases (RDS, Atlas)": [
    { title: "Amazon RDS for PostgreSQL – Docs", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html", type: "docs", estimatedHours: 2 },
    { title: "MongoDB Atlas Getting Started", url: "https://www.mongodb.com/docs/atlas/getting-started/", type: "docs", estimatedHours: 2 },
  ],

  // ── Site Reliability Engineer ─────────────────────────────────────────────
  "SLOs, SLIs & Error Budgets": [
    { title: "Site Reliability Engineering Book – Google (free)", url: "https://sre.google/sre-book/table-of-contents/", type: "article", estimatedHours: 6 },
    { title: "SLO vs SLA vs SLI – Atlassian", url: "https://www.atlassian.com/incident-management/kpis/sla-vs-slo-vs-sli", type: "article", estimatedHours: 1 },
  ],
  "Monitoring & Alerting": [
    { title: "Prometheus Docs – Getting Started", url: "https://prometheus.io/docs/introduction/overview/", type: "docs", estimatedHours: 2 },
    { title: "Grafana Getting Started", url: "https://grafana.com/docs/grafana/latest/getting-started/", type: "docs", estimatedHours: 2 },
    { title: "Monitoring & Alerting Strategies – SRE Book", url: "https://sre.google/sre-book/monitoring-distributed-systems/", type: "article", estimatedHours: 2 },
  ],
  "Incident Management": [
    { title: "Incident Management at Google – SRE Book", url: "https://sre.google/sre-book/managing-incidents/", type: "article", estimatedHours: 2 },
    { title: "PagerDuty Incident Response Guide", url: "https://response.pagerduty.com/", type: "docs", estimatedHours: 2 },
  ],
  "Distributed Tracing": [
    { title: "OpenTelemetry Docs", url: "https://opentelemetry.io/docs/", type: "docs", estimatedHours: 3 },
    { title: "Jaeger Tracing Tutorial", url: "https://www.jaegertracing.io/docs/latest/", type: "docs", estimatedHours: 2 },
  ],
  "Linux & Systems Administration": [
    { title: "Linux Command Line Tutorial – The Odin Project", url: "https://www.theodinproject.com/lessons/foundations-command-line-basics", type: "course", estimatedHours: 4 },
    { title: "Linux Journey", url: "https://linuxjourney.com/", type: "practice", estimatedHours: 5 },
  ],
  "Kubernetes & Containers": [
    { title: "Kubernetes Official Tutorials", url: "https://kubernetes.io/docs/tutorials/", type: "docs", estimatedHours: 5 },
    { title: "Kubernetes Full Course – TechWorld with Nana", url: "https://www.youtube.com/watch?v=X48VuDVv0do", type: "video", estimatedHours: 4 },
  ],
  "Capacity Planning": [
    { title: "Capacity Planning – SRE Book", url: "https://sre.google/sre-book/software-engineering-in-sre/", type: "article", estimatedHours: 2 },
    { title: "Load Testing with k6", url: "https://k6.io/docs/", type: "docs", estimatedHours: 2 },
  ],
  "Chaos Engineering": [
    { title: "Chaos Engineering Principles – principlesofchaos.org", url: "https://principlesofchaos.org/", type: "article", estimatedHours: 1 },
    { title: "Chaos Monkey – Netflix", url: "https://netflix.github.io/chaosmonkey/", type: "docs", estimatedHours: 2 },
  ],
  "Automation & Toil Reduction": [
    { title: "Eliminating Toil – SRE Book", url: "https://sre.google/sre-book/eliminating-toil/", type: "article", estimatedHours: 2 },
    { title: "Ansible Getting Started", url: "https://docs.ansible.com/ansible/latest/getting_started/index.html", type: "docs", estimatedHours: 3 },
  ],
  "Post-Mortems & RCA": [
    { title: "Blameless Post-Mortems – SRE Book", url: "https://sre.google/sre-book/postmortem-culture/", type: "article", estimatedHours: 1 },
    { title: "Post-Mortem Template – Atlassian", url: "https://www.atlassian.com/incident-management/postmortem/templates", type: "article", estimatedHours: 1 },
  ],

  // ── Data Engineer ─────────────────────────────────────────────────────────
  "ETL / ELT Pipelines": [
    { title: "ETL vs ELT – Databricks", url: "https://www.databricks.com/glossary/etl-pipeline", type: "article", estimatedHours: 1 },
    { title: "Building ETL Pipelines in Python – YouTube", url: "https://www.youtube.com/watch?v=dfouoh591Pc", type: "video", estimatedHours: 2 },
    { title: "Apache Airflow Tutorial – freeCodeCamp", url: "https://www.youtube.com/watch?v=K9AnJ9_ZAXE", type: "video", estimatedHours: 3 },
  ],
  "Apache Spark": [
    { title: "Apache Spark Official Docs", url: "https://spark.apache.org/docs/latest/", type: "docs", estimatedHours: 5 },
    { title: "PySpark Tutorial – freeCodeCamp", url: "https://www.youtube.com/watch?v=_C8kWso4ne4", type: "video", estimatedHours: 3 },
  ],
  "Apache Kafka": [
    { title: "Apache Kafka Official Docs", url: "https://kafka.apache.org/documentation/", type: "docs", estimatedHours: 4 },
    { title: "Kafka Full Course – Confluent", url: "https://developer.confluent.io/courses/", type: "course", estimatedHours: 5 },
  ],
  "Data Warehousing (Snowflake/BigQuery)": [
    { title: "Snowflake Getting Started", url: "https://docs.snowflake.com/en/user-guide-getting-started.html", type: "docs", estimatedHours: 3 },
    { title: "BigQuery Official Documentation", url: "https://cloud.google.com/bigquery/docs", type: "docs", estimatedHours: 3 },
    { title: "Data Warehousing Concepts – Coursera", url: "https://www.coursera.org/learn/data-warehousing", type: "course", estimatedHours: 5 },
  ],
  "Data Lakes": [
    { title: "Delta Lake Official Docs", url: "https://delta.io/", type: "docs", estimatedHours: 2 },
    { title: "Data Lake Architecture Explained – YouTube", url: "https://www.youtube.com/watch?v=7Ogd_eEXBVA", type: "video", estimatedHours: 1 },
  ],
  "SQL & dbt": [
    { title: "dbt Official Docs", url: "https://docs.getdbt.com/", type: "docs", estimatedHours: 4 },
    { title: "dbt Tutorial – freeCodeCamp", url: "https://www.youtube.com/watch?v=6z8iRbpNrno", type: "video", estimatedHours: 3 },
  ],
  "Airflow (Workflow Orchestration)": [
    { title: "Apache Airflow Official Docs", url: "https://airflow.apache.org/docs/", type: "docs", estimatedHours: 4 },
    { title: "Airflow Crash Course – YouTube", url: "https://www.youtube.com/watch?v=K9AnJ9_ZAXE", type: "video", estimatedHours: 3 },
  ],
  "Data Modeling": [
    { title: "Kimball Data Modeling Guide", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/", type: "article", estimatedHours: 3 },
    { title: "Data Modeling with dbt", url: "https://docs.getdbt.com/docs/building-a-dbt-project/using-ref", type: "docs", estimatedHours: 2 },
  ],
  "Cloud Data Platforms": [
    { title: "AWS Glue Docs", url: "https://docs.aws.amazon.com/glue/", type: "docs", estimatedHours: 2 },
    { title: "Google Cloud Data Engineering – Coursera", url: "https://www.coursera.org/professional-certificates/gcp-data-engineering", type: "course", estimatedHours: 20 },
  ],
  "Data Quality & Lineage": [
    { title: "Great Expectations – Data Quality Tool", url: "https://docs.greatexpectations.io/", type: "docs", estimatedHours: 3 },
    { title: "Data Lineage Explained – Monte Carlo", url: "https://www.montecarlodata.com/blog-data-lineage/", type: "article", estimatedHours: 1 },
  ],

  // ── AR/VR Developer ───────────────────────────────────────────────────────
  "AR vs VR Fundamentals": [
    { title: "AR vs VR vs MR Explained – Microsoft", url: "https://learn.microsoft.com/en-us/windows/mixed-reality/discover/mixed-reality", type: "article", estimatedHours: 1 },
    { title: "Introduction to AR/VR – Coursera", url: "https://www.coursera.org/learn/ar-vr-design-development", type: "course", estimatedHours: 5 },
  ],
  "Unity / Unreal for XR": [
    { title: "Unity XR Plugin Framework Docs", url: "https://docs.unity3d.com/Manual/XR.html", type: "docs", estimatedHours: 4 },
    { title: "Meta Quest Development with Unity – Official", url: "https://developer.oculus.com/documentation/unity/", type: "docs", estimatedHours: 5 },
  ],
  "ARKit / ARCore": [
    { title: "ARKit Official Documentation – Apple", url: "https://developer.apple.com/augmented-reality/arkit/", type: "docs", estimatedHours: 4 },
    { title: "ARCore Official Documentation – Google", url: "https://developers.google.com/ar/develop", type: "docs", estimatedHours: 4 },
  ],
  "3D Spatial Computing": [
    { title: "visionOS Developer Documentation – Apple", url: "https://developer.apple.com/visionos/", type: "docs", estimatedHours: 3 },
    { title: "3D Math for Game Developers – YouTube", url: "https://www.youtube.com/watch?v=OmgII6DLWT4", type: "video", estimatedHours: 2 },
  ],
  "Hand & Motion Tracking": [
    { title: "Meta Hand Tracking SDK – Docs", url: "https://developer.oculus.com/documentation/unity/unity-handtracking/", type: "docs", estimatedHours: 2 },
    { title: "Leap Motion Hand Tracking Docs", url: "https://docs.ultraleap.com/", type: "docs", estimatedHours: 2 },
  ],
  "Spatial Audio": [
    { title: "Resonance Audio – Google", url: "https://resonance-audio.github.io/resonance-audio/", type: "docs", estimatedHours: 2 },
    { title: "Spatial Audio in Unity – Meta Docs", url: "https://developer.oculus.com/documentation/unity/audio-ovrlipsync-unity/", type: "docs", estimatedHours: 2 },
  ],
  "Foveated Rendering": [
    { title: "Fixed Foveated Rendering – Meta", url: "https://developer.oculus.com/documentation/unity/unity-foveation/", type: "docs", estimatedHours: 1 },
    { title: "VR Performance Optimization – Oculus", url: "https://developer.oculus.com/documentation/unity/unity-perf/", type: "docs", estimatedHours: 2 },
  ],
  "6DoF Interaction": [
    { title: "6DoF Interaction Design – Meta", url: "https://developer.oculus.com/resources/design-guidelines/", type: "docs", estimatedHours: 2 },
    { title: "XR Interaction Toolkit – Unity", url: "https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@latest", type: "docs", estimatedHours: 3 },
  ],
  "World Anchoring & Persistence": [
    { title: "ARCore Cloud Anchors – Google", url: "https://developers.google.com/ar/develop/cloud-anchors", type: "docs", estimatedHours: 2 },
    { title: "ARKit Persistent World Tracking", url: "https://developer.apple.com/documentation/arkit/arworldmap", type: "docs", estimatedHours: 2 },
  ],
  "VR Comfort & UX": [
    { title: "VR Best Practices – Oculus", url: "https://developer.oculus.com/resources/bp-locomotion/", type: "docs", estimatedHours: 2 },
    { title: "Designing for VR – UX Planet", url: "https://uxplanet.org/designing-ux-for-virtual-reality-286b5da69e4a", type: "article", estimatedHours: 1 },
  ],

  // ── Embedded Systems Engineer ─────────────────────────────────────────────
  "C/C++ for Embedded": [
    { title: "Embedded C Programming – Udemy (Free)", url: "https://www.youtube.com/watch?v=sFLoFnR_-qA", type: "video", estimatedHours: 4 },
    { title: "C Programming for Embedded – Barr Group", url: "https://barrgroup.com/blog/embedded-c-programming-tutorial", type: "article", estimatedHours: 3 },
    { title: "C++ Reference", url: "https://en.cppreference.com/w/", type: "docs", estimatedHours: 3 },
  ],
  "Microcontrollers (Arduino/STM32)": [
    { title: "Arduino Official Tutorials", url: "https://docs.arduino.cc/tutorials/", type: "docs", estimatedHours: 4 },
    { title: "STM32 Getting Started – ST Microelectronics", url: "https://wiki.st.com/stm32mcu/wiki/Getting_started_with_STM32", type: "docs", estimatedHours: 4 },
    { title: "Embedded Systems with Arduino – YouTube", url: "https://www.youtube.com/watch?v=09zfRP0n9uU", type: "video", estimatedHours: 3 },
  ],
  "RTOS Concepts": [
    { title: "FreeRTOS Official Documentation", url: "https://www.freertos.org/Documentation/RTOS_book.html", type: "docs", estimatedHours: 4 },
    { title: "RTOS Concepts Explained – Shawn Hymel", url: "https://www.youtube.com/watch?v=F321087yYy4", type: "video", estimatedHours: 2 },
  ],
  "GPIO & Peripheral Interfaces": [
    { title: "Raspberry Pi GPIO Docs", url: "https://www.raspberrypi.com/documentation/computers/os.html#gpio-and-40-pin-header", type: "docs", estimatedHours: 2 },
    { title: "Arduino GPIO Tutorial", url: "https://docs.arduino.cc/language-reference/en/functions/digital-io/", type: "docs", estimatedHours: 1 },
  ],
  "SPI / I2C / UART Protocols": [
    { title: "SPI Communication Explained – SparkFun", url: "https://learn.sparkfun.com/tutorials/serial-peripheral-interface-spi/all", type: "article", estimatedHours: 1 },
    { title: "I2C Protocol Guide – SparkFun", url: "https://learn.sparkfun.com/tutorials/i2c/all", type: "article", estimatedHours: 1 },
    { title: "UART Explained", url: "https://www.youtube.com/watch?v=sTHckUyxwp8", type: "video", estimatedHours: 1 },
  ],
  "Interrupt Handling": [
    { title: "Interrupts in C – Barr Group", url: "https://barrgroup.com/blog/interrupts-c", type: "article", estimatedHours: 1 },
    { title: "Arduino Interrupt Tutorial", url: "https://www.youtube.com/watch?v=2kr5A350H7E", type: "video", estimatedHours: 1 },
  ],
  "Memory Management (Flash/RAM)": [
    { title: "Embedded Memory Management – EmbeddedArtistry", url: "https://embeddedartistry.com/blog/2017/02/22/exploring-memory-allocation-strategies/", type: "article", estimatedHours: 2 },
    { title: "linker scripts explained", url: "https://mcyoung.xyz/2021/06/01/linker-script/", type: "article", estimatedHours: 2 },
  ],
  "Watchdog Timers": [
    { title: "Watchdog Timer Guide – Microchip", url: "https://microchipdeveloper.com/xc8:wdt", type: "docs", estimatedHours: 1 },
    { title: "Using Watchdogs in Embedded Systems", url: "https://www.youtube.com/watch?v=jMEklH16UJI", type: "video", estimatedHours: 1 },
  ],
  "DMA & Low-Power Design": [
    { title: "DMA in STM32 – YouTube", url: "https://www.youtube.com/watch?v=ywi297B1t8o", type: "video", estimatedHours: 2 },
    { title: "Low Power Design for MCUs – EmbeddedArtistry", url: "https://embeddedartistry.com/blog/2019/06/03/low-power-embedded-system-design/", type: "article", estimatedHours: 2 },
  ],
  "Bootloaders & Firmware Updates": [
    { title: "Custom Bootloader for STM32 – YouTube", url: "https://www.youtube.com/watch?v=8rjfPAvRuEs", type: "video", estimatedHours: 3 },
    { title: "MCUBoot – Open Source Secure Bootloader", url: "https://docs.mcuboot.com/", type: "docs", estimatedHours: 2 },
  ],

  // ── Technical Product Manager ─────────────────────────────────────────────
  "Product Roadmapping": [
    { title: "Product Roadmap Guide – Productboard", url: "https://www.productboard.com/blog/product-roadmap/", type: "article", estimatedHours: 2 },
    { title: "How to Build a Product Roadmap – YouTube", url: "https://www.youtube.com/watch?v=56hce_h4J_I", type: "video", estimatedHours: 1 },
  ],
  "User Story Writing": [
    { title: "User Stories – Atlassian", url: "https://www.atlassian.com/agile/project-management/user-stories", type: "article", estimatedHours: 1 },
    { title: "Writing Great User Stories – Mountain Goat", url: "https://www.mountaingoatsoftware.com/agile/user-stories", type: "article", estimatedHours: 1 },
  ],
  "Agile / Scrum": [
    { title: "Scrum Guide – Official", url: "https://scrumguides.org/scrum-guide.html", type: "docs", estimatedHours: 2 },
    { title: "Agile Crash Course – YouTube", url: "https://www.youtube.com/watch?v=OJflDE6OaSc", type: "video", estimatedHours: 2 },
    { title: "Professional Scrum Master – Scrum.org Free Resources", url: "https://www.scrum.org/resources", type: "article", estimatedHours: 2 },
  ],
  "OKRs & Metrics": [
    { title: "OKRs Explained – Google re:Work", url: "https://rework.withgoogle.com/guides/set-goals-with-okrs/steps/introduction/", type: "article", estimatedHours: 1 },
    { title: "Measure What Matters – John Doerr Summary", url: "https://www.youtube.com/watch?v=L4N1q4RNi9I", type: "video", estimatedHours: 1 },
  ],
  "A/B Testing & Experimentation": [
    { title: "A/B Testing Guide – Optimizely", url: "https://www.optimizely.com/optimization-glossary/ab-testing/", type: "article", estimatedHours: 1 },
    { title: "A/B Testing – Udacity Free Course", url: "https://www.udacity.com/course/ab-testing--ud257", type: "course", estimatedHours: 8 },
  ],
  "Stakeholder Management": [
    { title: "Stakeholder Management – PMI", url: "https://www.pmi.org/learning/library/stakeholder-management-critical-success-9469", type: "article", estimatedHours: 1 },
    { title: "Managing Stakeholders as a PM – YouTube", url: "https://www.youtube.com/watch?v=1nSH0T9HCcc", type: "video", estimatedHours: 1 },
  ],
  "Technical Feasibility Assessment": [
    { title: "Technical Feasibility for PMs – Product School", url: "https://productschool.com/blog/product-fundamentals/technical-skills-product-managers", type: "article", estimatedHours: 1 },
    { title: "Working with Engineers as PM – YouTube", url: "https://www.youtube.com/watch?v=gDpQNH1vHEU", type: "video", estimatedHours: 1 },
  ],
  "Prioritization Frameworks": [
    { title: "RICE, MoSCoW & Other Prioritization Frameworks", url: "https://www.productplan.com/glossary/prioritization-frameworks/", type: "article", estimatedHours: 2 },
    { title: "Prioritization for Product Managers – YouTube", url: "https://www.youtube.com/watch?v=SF6J26WqnGc", type: "video", estimatedHours: 1 },
  ],
  "Product Analytics": [
    { title: "Mixpanel vs Amplitude vs GA4 Comparison", url: "https://amplitude.com/blog/mixpanel-vs-google-analytics", type: "article", estimatedHours: 1 },
    { title: "Product Analytics Crash Course – YouTube", url: "https://www.youtube.com/watch?v=O4yBGiAgJh0", type: "video", estimatedHours: 2 },
  ],
  "Go-to-Market Strategy": [
    { title: "Go-to-Market Strategy Guide – HubSpot", url: "https://blog.hubspot.com/sales/gtm-strategy", type: "article", estimatedHours: 2 },
    { title: "GTM Strategy for PMs – YouTube", url: "https://www.youtube.com/watch?v=IUnVZUAkCfg", type: "video", estimatedHours: 1 },
  ],
};

/**
 * getResourcesForTopic(topicName)
 * Returns resources array or a generic fallback if topic not in library.
 */
const getResourcesForTopic = (topicName) => {
  return (
    RESOURCES[topicName] || [
      {
        title: `Search "${topicName}" on freeCodeCamp`,
        url: `https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(topicName)}`,
        type: "article",
        estimatedHours: 2,
      },
      {
        title: `"${topicName}" on YouTube`,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topicName + " tutorial")}`,
        type: "video",
        estimatedHours: 2,
      },
    ]
  );
};

module.exports = { RESOURCES, getResourcesForTopic };
