# POSO: iBeacon Example
This is an example on how iBeacons can be modelled using POSO. Semantically publishing beacon information can help
other positioning systems to use the beacons.

```turtle
<http://example.com/beacons/80cc9ceBf9c9> a poso:BluetoothBeacon ;
  rdfs:label "80:CC:9C:EB:F9:C9"@en ;
  poso:hasPosition [ a poso:AbsolutePosition ;
    poso:hasAccuracy [ ... ] ;
    poso:xAxisValue [ ... ] ;
    poso:yAxisValue [ ... ] ;
    poso:zAxisValue [ ... ] ] .
```