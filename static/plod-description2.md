### Why two algorithms?

The [got.show](got.show) project is a result of the [JavaScript Technology seminar](https://rostlab.org/owiki/index.php/Javascript_technology_2016) that took place in spring 2016 at the [RostLab ](https://rostlab.org/)at [Technical University of Munich](http://www.in.tum.de/). Within this seminar, we were two groups of students developing two different algorithms for the same prediction task - which character is likely to die next?

Both our groups used different features to describe the data and different machine learning algorithms for the predictions. While the SMV-based algorithm - described here - performed better at predicting dead characters, it is still interesting to look at the result of the Naive Bayes-based algorithm, described below.

### Feature selection

The steps of data extraction from the _Ice and Fire_ [wiki](http://awoiaf.westeros.org) and of feature selection were performed as described here. However, the feature set of our second group was slightly different and the following features were selected as the most contributing ones for the distinction between dead and alive characters (the descriptions of features are in parentheses and the sorting is from most to least contributing):

1. House (house to which the character belongs)
2. Culture (social group to which a character belongs.
3. Gender (male or female)
4. Title (social status or nobility)
5. Age (time-reference: 305 AC. Characters born more than 100 years ago, which have not died yet have age 100)
6. Has house 
7. Has spouse (indicates whether a character is married)
8. Age group
9. Is spouse alive (indicates whether the spouse is alive)
10. Links
11. Connections
12. House founded
13. Has heir (indicates whether a character has a heir)
14. Score
15. Has title
16. Multiple books 
17. Has heir alive (indicates whether the heir of a character is still alive)
18. Is noble
19. Status

### Method description

We used the implementation of the [Naive Bayes](https://en.wikipedia.org/wiki/Naive_Bayes_classifier) classifier (John and Langley, 1995) with its default parameters, which is provided in the WEKA workbench (Hall et al., 2009). Similar to the procedure of the first classifier - described here - we split our data set into 10 equally-sized subsets. We trained our model on 9 subsets and tested on the remaining one. We rotated our subsets such that each subset was used for testing exactly once. 

### Method performance

We measured the performance of our method as described here and the prediction results were:

Label Number of characters Precision Recall F-measure
Alive 1473 80% 88% 0.84
Dead 466 43% 29% 0.34

### References

John, G.H. and Langley, P., 1995, August. Estimating continuous distributions in Bayesian classifiers. In _Proceedings of the Eleventh conference on Uncertainty in artificial intelligence_ (pp. 338-345). Morgan Kaufmann Publishers Inc.

Hall, M., Frank, E., Holmes, G., Pfahringer, B., Reutemann, P. and Witten, I.H., 2009. The WEKA data mining software: an update. _ACM SIGKDD explorations newsletter, 11_(1), pp.10-18.
