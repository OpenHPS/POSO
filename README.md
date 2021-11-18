# POSO: A Generic Positioning System Ontology
*POSO is a generic ontology positioning system ontology. Other than many geospatial ontologies, POSO focuses on 
the semantics needed to express a position.*

## Classes

### Stimulus
A positioning system can be triggered by movement. We identify linear and angular movement as two possible events that can
cause an update of the output position.

### Procedure
> A workflow, protocol, plan, algorithm, or computational method specifying how to make an Observation, create a Sample, or make a change to the state of the world (via an Actuator). A Procedure is re-usable, and might be involved in many Observations, Samplings, or Actuations. It explains the steps to be carried out to arrive at reproducible Results.

In the context of a positioning system, a procedure is an algorithm or computational method to sample sensor data to a position. POSO offers general classes for the different positioning techniques, and individuals for well known positioning algorithms.

## Properties

## Individuals


## License
POSO is licensed under the [MIT license](LICENSE) and maintained by Vrije Universiteit Brussel.

## References
1. Haller, A., Janowicz, K., Cox, S. J., Lefrançois, M., Taylor, K., Le Phuoc, D., ... & Stadler, C. (2019). The modular SSN ontology: A joint W3C and OGC standard specifying the semantics of sensors, observations, sampling, and actuation. Semantic Web, 10(1), 9-32.