The Branch Predictor project focuses on designing and implementing branch prediction algorithms to optimize the execution pipeline of modern processors. By predicting the outcome of conditional branches accurately, this project aims to minimize pipeline stalls and improve overall processor performance.

## Project Objectives
- **Understand Branch Prediction:** Study the importance and impact of branch predictors in modern processor architecture.
- **Implement Predictors:** Design multiple branch prediction algorithms, ranging from basic static predictors to advanced dynamic predictors.
- **Optimize Performance:** Analyze and optimize the accuracy and latency of predictors while adhering to hardware constraints.
- **Evaluate Trade-offs:** Explore trade-offs between prediction accuracy, hardware complexity, and execution speed.

## Key Features
- **Algorithm Implementation:** 
  - Static Predictor: Always predicts a branch as taken or not taken.
  - Dynamic Predictors: Implements advanced techniques such as:
    - Two-Level Adaptive Predictor
    - GShare Predictor
    - Perceptron-Based Predictor
- **Simulation Framework:** The project uses a provided framework to simulate real-world branch behavior using trace files.
- **Performance Metrics:** Evaluate predictors using metrics such as misprediction rate, hardware resource utilization, and speed.

## Outcomes
- Developed multiple branch prediction algorithms with varying levels of complexity.
- Analyzed and optimized predictors for accuracy and speed in a constrained hardware-like environment.
- Gained hands-on experience with performance-critical programming and computer architecture principles.
