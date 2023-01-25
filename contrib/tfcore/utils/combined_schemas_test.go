package utils_test

import (
	"github.com/hashicorp/terraform-plugin-sdk/v2/helper/schema"
	"github.com/synapsecns/sanguine/contrib/tfcore/utils"
	"testing"
)

func TestCombineSchemas(t *testing.T) {
	googleProvider := &schema.Provider{
		Schema: map[string]*schema.Schema{
			"project": &schema.Schema{
				Type:     schema.TypeString,
				Required: true,
			},
			"zone": &schema.Schema{
				Type:     schema.TypeString,
				Required: true,
			},
		},
		ResourcesMap: map[string]*schema.Resource{
			"google_compute_instance": &schema.Resource{},
		},
		DataSourcesMap: map[string]*schema.Resource{
			"google_compute_instance": &schema.Resource{},
		},
	}
	underlyingProvider := &schema.Provider{
		Schema: map[string]*schema.Schema{
			"region": &schema.Schema{
				Type:     schema.TypeString,
				Required: true,
			},
			"vpc": &schema.Schema{
				Type:     schema.TypeString,
				Required: true,
			},
		},
		ResourcesMap: map[string]*schema.Resource{
			"aws_instance": &schema.Resource{},
		},
		DataSourcesMap: map[string]*schema.Resource{
			"aws_instance": &schema.Resource{},
		},
	}
	toReplace := "aws"
	replaceWith := "google"
	combinedSchema := utils.CombineSchemas(googleProvider, underlyingProvider, toReplace, replaceWith)
	if combinedSchema.Schema["project"].Required != true {
		t.Errorf("Expected project to be required but got %v", combinedSchema.Schema["project"].Required)
	}
	if combinedSchema.Schema["zone"].Required != true {
		t.Errorf("Expected zone to be required but got %v", combinedSchema.Schema["zone"].Required)
	}
	if combinedSchema.ResourceMap["google_instance"] == nil {
		t.Errorf("Expected resource map to have key google_instance but got %v", combinedSchema.ResourceMap)
	}
	if combinedSchema.DataSourceMap["google_instance"] == nil {
		t.Errorf("Expected data source map to have key google_instance but got %v", combinedSchema.DataSourceMap)
	}
}